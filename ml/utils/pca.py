import pandas as pd

from sklearn.decomposition import PCA

from sklearn.ensemble import IsolationForest


def principal_component_analysis(df, df_pred, n_components=2):
    """
    Isolation Forest model

    Args:
        @df pandas test dataframe

    Return: pandas dataframe including predictions from XGBoost model and feature importance data, if applicable

    """
    pca = PCA(n_components=n_components)
    df = pd.DataFrame(pca.fit_transform(df), columns=['PCA1', 'PCA2'])

    df = pd.concat([df, df_pred], axis=1)

    df['_pred'] = df['_pred'].apply( lambda x: 'Benign' if x == 1 else 'Anomalous')

    return df

