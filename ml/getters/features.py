import redis
import pickle
from config import *
from typing import List, TypedDict

"""
Summary tab will have model id, type, classes (anomaly/benign),
algorithm, trained on date, num columns used, model parameters
"""

def _get_features(model_name : str) -> List[dict]:
    """
    Get summary of model

    Input:
        - model_name (str), model name to query redis server
    """
    data = []
    model = pickle.loads(redis_server.get(model_name))

    if model:
        attributes = model["attributes"]
        for attributes in model["attributes"]:
            data.append({
                "field" : attributes[0],
                "data"  : attributes[1]
            })

    return data 


if __name__ == '__main__':
    print(_get_features('test01'))