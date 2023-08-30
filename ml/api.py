from concurrent.futures import thread
from flask import Flask, request
from flask_cors import CORS
from Injector import Injector
from Model_Getter import ModelGetter

from getters.details import _get_details
from getters.summary import _get_summary
from getters.features import _get_features
from getters.explainability import _get_explainability
from getters.results import _get_results

import json

app = Flask(__name__)
CORS(app)
supervised_threads = {}
unsupervised_threads = {}
pca_threads = {}
update_threads = {}


# routes
@app.route('/inject', methods=['POST'])
async def inject_handler():
    """
    Handler
    """
    global unsupervised_threads
    thread_id = str(request.json["id"])[:-6]
    unsupervised_threads[thread_id] = Injector(request, DEBUG=True)
    unsupervised_threads[thread_id].start()
    
    return json.dumps({
        "status_code" :  201
    })

@app.route('/models', methods=['GET'])
async def get_models():
    """
    Handler
    """
    model_list = ModelGetter().run()
    
    return json.dumps({
        "models" : model_list
    })

@app.route('/details', methods=['POST'])
async def get_details():
    """
    Handler
    """
    details = _get_details(str(request.json["modelName"]["modelName"]))
    
    return json.dumps({
        "details" : details
    })



@app.route('/features', methods=['POST'])
async def get_features():
    """
    Handler
    """
    features = _get_features(str(request.json["modelName"]["modelName"]))

    
    return json.dumps({
        "features" : features
    })

@app.route('/summary', methods=['POST'])
async def get_summary():
    """
    Handler
    """
    summary = _get_summary(str(request.json["modelName"]["modelName"]))

    
    return json.dumps({
        "summary" : summary
    })

@app.route('/explainability', methods=['POST'])
async def get_explainability():
    """
    Handler
    """
    explainability = _get_explainability(str(request.json["modelName"]["modelName"]))

    
    return json.dumps({
        "explainability" : explainability
    })

@app.route('/results', methods=['POST'])
async def get_results():
    """
    Handler
    """
    results = _get_results(str(request.json["modelName"]["modelName"]))

    
    return json.dumps({
        "results" : results
    })