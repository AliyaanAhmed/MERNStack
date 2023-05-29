import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from surprise import SVD, Reader, Dataset
from surprise.model_selection import cross_validate, train_test_split, RandomizedSearchCV
from surprise.prediction_algorithms.knns import KNNWithMeans
from pymongo import MongoClient


client = MongoClient('mongodb://localhost:27017/Karoobar')
db = client['your_database_name']
collection = db['your_collection_name']


def get_user_id_from_website():
    
    user_id = 'AKM1MP6P0OYPR'  # Replace this with your actual logic to get the user ID
    return user_id

user_id = get_user_id_from_website()


data = list(collection.find({'userId': user_id}))
df = pd.DataFrame(data)
df.columns = ['userId', 'productId', 'Rating', 'timestamp']

df.head()

plt.figure(figsize=(10, 6))
sns.countplot(x='Rating', data=df)
plt.title("Users Against Rating")
plt.xlabel('Rating', fontsize=15)
plt.ylabel('USERS', fontsize=10)
plt.show()

reader = Reader()
surprise_data = Dataset.load_from_df(df[['userId', 'productId', 'Rating']], reader)
trainingSet, testSet = train_test_split(surprise_data, test_size=0.3, random_state=10)

options = {
    "name": ["msd", "pearson", "cosine", "pearson_baseline"],
    "min_support": [3, 4, 5],
    "user_based": [True],
}

params = {'k': range(30, 50, 1), 'sim_options': options}
clf = RandomizedSearchCV(KNNWithMeans, params, n_iter=5, measures=['rmse'], cv=3)
clf.fit(surprise_data)

svd = SVD()
results = cross_validate(svd, surprise_data, measures=['RMSE', 'MAE'], cv=5, verbose=True)

trainingSet = surprise_data.build_full_trainset()
result = svd.fit(trainingSet)

df[df['userId'] == user_id]