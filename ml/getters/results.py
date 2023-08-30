import redis
import pickle
import numpy as np
import pandas as pd
from config import *
from typing import List, TypedDict

"""
Results page will have the graphs to visualize the results
"""

def _get_results(model_name : str) -> List[dict]:
    """
    Get summary of model

    Input:
        - model_name (str), model name to query redis server
    """
    data = []
    model = pickle.loads(redis_server.get(model_name))

    if model:
        df = model["data"]
        big_df = pd.DataFrame()

        # Get benign & anomalous
        benign_df = df[df['_pred'] == 'Benign'].copy()
        benign_df.drop(columns=['_type', '_pred'], inplace=True)

        anomalous_df = df[df['_pred'] == 'Anomalous'].copy()
        anomalous_df.drop(columns=['_type', '_pred'], inplace=True)


        for col in df.columns:

            if col in ['_pred', '_type']:
                continue

            big_df = pd.DataFrame()

            benign_df = df[col][df['_pred'] == 'Benign'].copy()
            temp = pd.DataFrame(benign_df.value_counts())
            temp['_pred'] = ["Benign"]*len(temp)  
            temp['field'] = temp.index

            big_df = pd.concat([big_df, temp])

            benign_df = df[col][df['_pred'] == 'Anomalous'].copy()
            temp = pd.DataFrame(benign_df.value_counts())
            temp['_pred'] = ["Anomalous"]*len(temp)     
            temp['field'] = temp.index

            big_df = pd.concat([big_df, temp])

            big_df.sort_values(by=[col])
            
            data.append({
                "field" : col,
                "value" : big_df.to_dict('records')
            })

    return data 


if __name__ == '__main__':
    print(_get_results('test01'))