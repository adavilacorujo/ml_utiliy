import redis
import pickle
from config import *
from typing import List, TypedDict

"""
Explainability tab will have feature importance graph
"""

def _get_explainability(model_name : str) -> List[dict]:
    """
    Get summary of model

    Input:
        - model_name (str), model name to query redis server
    """
    data = []
    
    model = pickle.loads(redis_server.get(model_name))
    if model:
        for _, row in model['ft'].iterrows():
            data.append({
                "field"         : row["column_name"],
                "data"   : row["shap_importance"]
            })

    return data 


if __name__ == '__main__':
    print(_get_explainability('test01'))