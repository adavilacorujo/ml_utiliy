import os
import time
import shap
import redis
import pickle
import threading
import numpy as np
import pandas as pd

from config import *
from datetime import *
# from pandasql import sqldf
from typing import List, TypedDict
from classifier.isolation_forrest import *
from utils.attribute_pipeline import * 
from pandas import json_normalize
from elasticsearch7 import Elasticsearch
from utils.pca import principal_component_analysis




class Injector(threading.Thread):
    def __init__(self, json_data : TypedDict, creds=None, DEBUG=False):
        super().__init__()

        self.name   = "Injector"
        self.help   = "Threading class to inject faulty data and run" \
                        " unsupervised model on it."
        
        # variables
        self.id             : str = json_data.json["id"]
        self.index          : str = json_data.json["index"]
        self.end_date       : str = json_data.json["endDate"]
        self.data_type      : str = json_data.json["dataType"]
        self.model_name     : str = json_data.json["modelName"]
        self.start_date     : str = json_data.json["startDate"]
        self.data_filter    : str = json_data.json["dataFilter"]
        self.modify_filter  : str = json_data.json["modifyFilter"]
        self.attribute_list : str = json_data.json["attributeList"]


        self.es_node        : str = os.getenv('ES_HOST', 'localhost')
        self.security_flag  : int = int(os.getenv('SECURITY_FLAG', 0))

        self.es_server      = Elasticsearch([f"http://{self.es_node}:9200"])
        
        if self.security_flag == 1:
            # Get client through authentication
            self.es_username    : str = os.getenv('ES_USERNAME', 'elastic')
            self.es_password    : str = os.getenv("ES_PASSWORD", "password")
            self.es_server      = Elasticsearch([f"http://{self.es_node}:9200"], )
        
        # debug flag
        self.DEBUG : bool = DEBUG

        
    def run(self):
        """ 
        Driver to pull data, inject data, run unsupervised model,
        and save predictions
        """

        # timer = time.time()

        cf = []
        nf = []
        processed = 0

        # Get data from server using data, index, data_type filter
        data_query      = self.create_query()
        index           = self.index
        importance_df   = pd.DataFrame()


        # get count of records in an index
        count = self.es_server.cat.count(index, params={'format': 'json'})
        count = int(count[0]['count'])
        
        if self.DEBUG: self._print_info('DEBUG: running data')

        while(processed < count):


            # get data
            df = self.get_data(query=data_query, count=count)

            if df.empty:
                # no data found
                self._save_emtpy_query(df)
                return 
            
            if self.DEBUG: self._print_info(f'DEBUG: Processed {processed} out of {count}')
            
            df_pred = df[["_id"]]

            df = df.loc[:, ~df.columns.isin(
                ["_id", "_index", "_score", "EVENT_LABEL"])]

            # Dividing the columns between categorical and numberical
            if(processed == 0):
                for col in df.columns:
                    # separating categorical and numerical features
                    if col != '_type':
                        if isinstance(df.loc[0, col], str):
                            cf.append(col)
                        else:
                            nf.append(col)


            # inject value into data
            df = self._apply_filter(df, self.data_filter)
            df = self._modify_attribute(df, self.modify_filter)

            x_test = pipeline(cf, nf, df)

            df_pred, model, hyper_parameters = isolation_forrest(x_test)
            df_pca = principal_component_analysis(x_test, df_pred)

            # Only get feature importance if more than one attribute provided
            if len(self.attribute_list) > 1: importance_df = self.get_save_feature_importance(model, x_test)


            df = pd.concat([df, df_pred], axis=1)

            df['_pred'] = df['_pred'].apply( lambda x: 'Benign' if x == 1 else 'Anomalous')

            processed += df.shape[0]

        attributes = self._attributes_with_dtype(nf, 'Numeric')
        attributes.extend(self._attributes_with_dtype(cf, 'Category'))
        print("With Categorical", df.shape[1])

        # save the predictions and importance to the Redis server
        redis_value = {
            "id"                : self.id,
            "model_name"        : self.model_name,
            "data"              : df,
            "ft"                : importance_df,
            "record_count"      : df.shape[0],
            "num_attributes"    : len(attributes),
            "model"             : model,
            "index"             : self.index,
            "date_range"        : (self.start_date, self.end_date),
            "trained_on"        : datetime.now().strftime("%m/%d/%Y, %H:%M:%S"),
            "pca"               : df_pca,
            "attributes"        : attributes,
            "data_type"         : self.data_type,
            "hyper_parameters"  : hyper_parameters
            # Investigate how to produce metrics: https://arxiv.org/pdf/1905.05667.pdf
        }

        # IDEA: Sub-population analysis
        # https://knowledge.dataiku.com/latest/ml-analytics/model-results/concept-visual-model-summary.html
        if self._save_to_redis(key=self.model_name, value=redis_value):
            if self.DEBUG: self._print_info('DEBUG: saved predictions')
        
        if self.DEBUG: self._print_info('DEBUG: done')

        return 200


    def get_data(self, query, count):
        """ 
        Get Data from elasticsearch

        Args:
            pred_index: index where the data is located
            query: query used to obtain data
            count: number of records in the index
        """
        index = self.index

        self.es_server.indices.refresh(index=index)
        res = self.es_server.search(
            index=index, body=query, scroll='10m')

        df = json_normalize(res['hits']['hits'])

        # 100k at a time
        for _ in range(0, int(count/10000)):
            res = self.es_server.scroll(scroll_id=res['_scroll_id'], scroll='10m')
            
            if(not len(res['hits']['hits'])):
                break

            df = pd.concat(
                [
                    df, 
                    json_normalize(res['hits']['hits'])
                ], axis=0, ignore_index=True)

        # column cleanup
        cols = [x.replace("_source.", "") for x in df.columns]
        df.columns = cols

        return df
    
    def create_query(self, size=10000):
        """
        Get query for getting test dataset

        Args:
            @s supervised or unsupervised bit
            @train_index index holding training data
            @test_index index holding testing data
            @column_list list of columns to include
            @start_time start time for dataset filtering
            @end_time end time for dataset filtering
        
        Return: query for getting test dataset
        """

        return {
            "_source": [attribute.replace('.keyword', '') for attribute in self.attribute_list],
            "size": size,
            "query": {
                "function_score": {
                    "query": {
                        "bool": {
                            "must": [
                                {
                                    "range": {
                                        "@timestamp": {
                                            "gte": self.start_date,
                                            "lte": self.end_date
                                        }
                                    },
                                }
                            ],
                            "filter": { "term": { "log.file.path.keyword": self.data_type } },
                        },
                    },
                    "functions": [{
                        "random_score": {}
                    }]
                }
            }
        }
    
    def get_save_feature_importance(self, model, x_test):
        """
        
        """
        # Explain model predictions using shap library:
        explainer = shap.TreeExplainer(model)
        shap_values = explainer.shap_values(x_test)


        shap_sum = np.abs(shap_values).mean(axis=0)
        importance_df = pd.DataFrame([x_test.columns.tolist(), shap_sum.tolist()]).T
        importance_df.columns = ['column_name', 'shap_importance']
        importance_df = importance_df.sort_values('shap_importance', ascending=False)
        
        return importance_df
    
    def _save_to_redis(self, key : str, value : object) -> bool:
        try:
            redis_server.set(key, pickle.dumps(value))
            return True

        except Exception as e:
            print("DEBUG: error saving to redis")
            print(str(e))
            return False
    

    def _print_info(self, message: str) -> None:
        """
        Print info
        """
        print(message)

    def _apply_filter(self, df : object, filter : dict) -> object:
        """
        Apply the filter to the data frame pulled from ES

        Input:
            - df (pd.DataFrame)
            - filter (dict), filter from the inject flyout front-end component
        """

        # dictionaries equate to false if empty 
        # https://stackoverflow.com/questions/23177439
        if not filter: 
            return df
        
        operator_mapping = {
            'IS'                : df[filter['attribute']] == filter['options'].strip(),
            'IS NOT'            : df[filter['attribute']] != filter['options'].strip(),
            'CONTAINS'          : df[filter['attribute']].isin([filter['options'].strip()]),
            'IS LESS THAN'      : df[filter['attribute']] < filter['options'].strip(),
            'IS GREATER THAN'   : df[filter['attribute']] > filter['options'].strip(),
        }

        return df[operator_mapping[filter['operator']]]
    
    def _modify_attribute(self, df : object, filter : dict) -> object:
        """
        Modify data pulled from ES

        Input:
            - df (pd.DataFrame)
            - filter (dict), modify filter from the inject flyout front-end component
        """

        # dictionaries equate to false if empty 
        # https://stackoverflow.com/questions/23177439
        if not filter: 
            return df
        
        df[filter['attribute']] = filter['options'].strip()
        return df
    

    def _attributes_with_dtype(self, columns, data_type) -> List[tuple]:
        """
        Get the attributes used with their data types
        """
        return [(col, data_type) for col in columns]
    
    def _save_emtpy_query(self, df) -> None:
        """
        Save the model as empty
        """
        redis_value = {
            "id"                : self.id,
            "model_name"        : self.model_name,
            "data"              : df,
            "ft"                : pd.DataFrame(),
            "record_count"      : df.shape[0],
            "num_attributes"    : df.shape[1],
            "model"             : None,
            "index"             : self.index,
            "date_range"        : (self.start_date, self.end_date),
            "trained_on"        : datetime.now().strftime("%m/%d/%Y, %H:%M:%S"),
            "pca"               : pd.DataFrame(),
            "attributes"        : [],
            "data_type"         : self.data_type,
            "hyper_parameters"  : []
            # Investigate how to produce metrics: https://arxiv.org/pdf/1905.05667.pdf
        }

        if self._save_to_redis(key=self.model_name, value=redis_value):
            if self.DEBUG: self._print_info('DEBUG: saved predictions')
        
        if self.DEBUG: self._print_info('DEBUG: done')