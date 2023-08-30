import redis
import pickle
from config import *
from typing import List, TypedDict

"""
Summary tab will have model id, type, classes (anomaly/benign),
algorithm, trained on date, num columns used, model parameters
"""

def _get_summary(model_name : str) -> List[dict]:
    """
    Get summary of model

    Input:
        - model_name (str), model name to query redis server
    """
    data = {}
    
    model = pickle.loads(redis_server.get(model_name))

    if model:
        data = (
            {
                "field" : "id",
                "data"  : model["id"]
            },
            {
                "field" : "type",
                "data"  : "Anomaly Detection",
            },
            {
                "field" : "classes",
                "data"  : "Anomaly / Benign"
            },
            {
                "field"     : "algorithm",
                "data"      : "Isolation Forest"
            },
            {
                "field"     : "num_attributes",
                "data"      : model["num_attributes"]
            },
            {
                "field"     : "data_type",
                "data"      : model["data_type"]
            },
            {
                "field"     : "date_created",
                "data"      : model["trained_on"]
            }
        )

    return data 



if __name__ == '__main__':
    print(_get_summary('test01'))