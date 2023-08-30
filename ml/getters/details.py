import redis
import pickle
from config import *
from typing import List, TypedDict

"""
Details tab will have algorithm, number of trees, hyper-parameters,
and training data used
"""

def _get_details(model_name : str) -> List[dict]:
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
                "field" : "contamination",
                "data"  : model["hyper_parameters"]["contamination"]
            },
            {
                "field" : "max_samples",
                "data"  : model["hyper_parameters"]["max_samples"],
            },
            {
                "field" : "n_estimators",
                "data"  : model["hyper_parameters"]["n_estimators"]
            },
        )

    return data 


if __name__ == '__main__':
    print(_get_details('test01'))