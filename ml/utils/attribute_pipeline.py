import pandas as pd

from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import QuantileTransformer, OrdinalEncoder

def pipeline(cf, nf, df):
    """
    Preprocess pipeline

    Args:
        @cf list of categorical features
        @nf list of numerical features
        @df pandas dataframe to process

    Return: preprocessed pandas dataframe

    """
    categorical_features = cf
    numeric_features = nf

    for feature in categorical_features:
        if feature != "_type":
            df[feature] = df[feature].astype('str')

    for feature in numeric_features:
        if isinstance(df[feature][0], int):
            df[feature].replace('', -1)
            df[feature] = df[feature].astype('int')

        elif isinstance(df[feature][0], float):
            df[feature].replace('', -1)
            df[feature] = df[feature].astype('float')

    # numerical features
    num_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='constant', fill_value=-1)),
        ('quantile', QuantileTransformer(
            output_distribution='normal', random_state=0)),
    ])

    # categorical features
    cat_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy="constant", fill_value='NaN')),
        ('cat', OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1)),
        ('quantile', QuantileTransformer(
            output_distribution='normal', random_state=0)),
    ])

    preprocess_pipeline = ColumnTransformer([
        ("num_pipeline", num_pipeline, numeric_features),
        ("cat_pipeline", cat_pipeline, categorical_features),
    ])
    # create preprocessed data
    df_pp = pd.DataFrame(preprocess_pipeline.fit_transform(
        df), columns=numeric_features + categorical_features)

    return df_pp