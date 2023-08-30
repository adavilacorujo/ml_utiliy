import pandas as pd

from sklearn.ensemble import IsolationForest

def isolation_forrest(df, contamination=0.14823, max_samples=250, n_estimators=200):
    """
    Isolation Forest model

    Args:
        @df pandas test dataframe

    Return: pandas dataframe including predictions from XGBoost model and feature importance data, if applicable

    """
    model = IsolationForest(contamination=contamination, max_samples=max_samples, n_estimators=n_estimators)
    # model = IsolationForest(contamination=0.05)

    model.fit(df)

    # get predictions from model on data
    df = pd.DataFrame(model.predict(df), columns=["_pred"])

    return df, model, {"contamination" : contamination, "max_samples" : max_samples, "n_estimators": n_estimators}

