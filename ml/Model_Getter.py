import json
import redis
import pickle

from config import *
from typing import List, TypedDict


class Models(TypedDict):
    id              : str
    model_name      : str
    record_count    : int
    start_date      : str
    end_date        : str
    index           : str
    num_attributes  : int
    data_type       : str
    date_created    : str



class ModelGetter():
    def __init__(self):
        self.name = "ModelGetter"
        self.help = "Getter for unsupervised ML models from Redis server"

    def run(self) -> List[dict]:
        return self._get_models()


    def _get_models(self) -> List[dict]:
        """
        Driver for the class
        """
        keys = [value.decode('utf-8') for value in redis_server.keys('*')]

        # For each model, scan the redis server and save the data
        models = self._for_each_model(keys)
        
        return models


    def _for_each_model(self, keys : List) -> List[dict]:
        """
        
        """
        models = []

        for key in keys:
            model = pickle.loads(redis_server.get(key))
            model_dict : Models = {
                "id"            : model["id"],
                "model_name"    : model["model_name"],
                "record_count"  : model["record_count"],
                "start_date"    : model["date_range"][0],
                "end_date"      : model["date_range"][1],
                "index"         : model["index"],
                "num_attributes": model["num_attributes"],
                "data_type"     : model["data_type"],
                "date_created"  : model["trained_on"]
            }

            models.append(model_dict)

        return models