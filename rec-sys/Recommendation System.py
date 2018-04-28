import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import time as systime
import datetime as dtime
import string
import seaborn as sns
from sklearn import preprocessing
from sklearn.cross_validation import train_test_split #for splitting the training set
from sklearn.metrics import log_loss #evaluation metric
from sklearn.ensemble import AdaBoostClassifier, GradientBoostingClassifier, RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import BernoulliNB
from sklearn.linear_model import LogisticRegression
import operator
from os import listdir
from numpy.linalg import *

from numpy import linalg as la
import numpy as np
LA = np.linalg

import scipy.linalg as SL
import numpy, scipy.sparse
import pylab as pl
from sklearn import linear_model
from sklearn import metrics
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.cross_validation import train_test_split
import seaborn as sns
from sklearn.ensemble import AdaBoostClassifier
from random import shuffle
from sklearn.utils import shuffle
import statsmodels.formula.api as smf
from sklearn.preprocessing import Imputer
import datetime as dt
from scipy.stats.stats import pearsonr  
from sklearn import datasets, linear_model
from sklearn.linear_model import LinearRegression
import statsmodels.api as sm
from scipy import stats
from pandas.tools import plotting

from sklearn import datasets
from sklearn.cross_validation import cross_val_predict
from sklearn import linear_model

import operator
from os import listdir
import matplotlib
import pandas as pd
from numpy.linalg import *
from scipy.stats.stats import pearsonr
from numpy import linalg as la
import numpy as np
LA = np.linalg
import numpy as np
import scipy.linalg as SL
import numpy, scipy.sparse
import pandas
from pandas.tools.plotting import scatter_matrix
from sklearn import model_selection
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC


from convert_query_to_dataframe import get_recommender_data

#df=pd.read_csv("Evaluate_Dataset.csv")
df = get_recommender_data()

'''
print(df.head())
print("\nNumber of rows::",df.shape[0])
print("\nNumber of columns::",df.shape[1] )
print("\nColumn Names::",df.columns.values.tolist())
print("\nColumn Data Types::\n",df.dtypes)
print("\nColumns with Missing Values::",df.columns[df.isnull().any()].tolist())
print("\nNumber of rows with Missing Values::",len(pd.isnull(df).any(1).nonzero()[0].tolist()))
print("\nSample Indices with missing data::",pd.isnull(df).any(1).nonzero()[0].tolist()[0:5] )

print("General Stats::")
print(df.info())
'''

# TypeCasting
#df['date'] = pd.to_datetime(df.date)
df['prod_id']=df['prod_id'].astype(str)
df['cat_id']=df['cat_id'].astype(str)
df['user_id']=df["user_id"].astype(str)
df['state']=df['state'].astype(str)

'''
print("Summary Stats::" )
print(df.describe())
#Analysis in order extract review rating using user inputl
print("Information on Bidding amount being greater than selling amount" )
print("\n")
print(df[df.bid_amount>df.sold_at_price].info())
print("Information on Bidding amount being less than the selling amount" )
print("\n")
print(df[df.bid_amount<df.sold_at_price].info())
'''

# Rating evaluation function
def rating(row):
    if row["bid_amount"]>row["sold_at_price"]:
        return 5
    if row["bid_amount"]< row["sold_at_price"]:
        if( row["bid_amount"] <= (0.2*row["sold_at_price"])):
            return 1
        elif ( row["bid_amount"] <= (0.4*row["sold_at_price"])):
            return 2
        elif( row["bid_amount"] <= (0.6*row["sold_at_price"])):
            return 3
        elif ( row["bid_amount"] <= (0.8*row["sold_at_price"])):
            return 4
        else:
            return 5

#Creating new rating column
df['Ratings'] = df.apply (lambda row: rating(row),axis=1)
df.head(5)

'''
# New important demographic exploratory data analysis Observations
list=['1','2','3','4','5','6','7','8','9','10']
for i in list:
    print("Mean Bidding Amount for Product ID",i,"is:",df["bid_amount"][df["prod_id"]==i].mean())
	
list=['1','2','3','4','5','6','7','8','9','10']
for i in list:
    print("Mean Selling Price for Product ID",i,"is:",df["sold_at_price"][df["prod_id"]==i].mean())
list=['1','2','3','4']
for i in list:
    print("Mean Rating for Product ID",i,"is:",df["Ratings"][df["prod_id"]==i].mean())
    print("Min Rating for Product ID",i,"is:",df["Ratings"][df["prod_id"]==i].min())
    print("Mac Rating for Product ID",i,"is:",df["Ratings"][df["prod_id"]==i].max())
    print("\n")

list=['1','2','3','4']
for i in list:
    print("Mean Age for State",i,"is:",df["age"][df["state"]==i].mean())
    print("Min Age for State",i,"is:",df["age"][df["state"]==i].min())
    print("Max Age for State",i,"is:",df["age"][df["state"]==i].max())
    print("\n")

list=['5','6','7','8']
for i in list:
    print("Mean Age for State",i,"is:",df["age"][df["state"]==i].mean())
    print("Min Age for State",i,"is:",df["age"][df["state"]==i].min())
    print("Max Age for State",i,"is:",df["age"][df["state"]==i].max())
    print("\n")

list=['7','8']
for i in list:
    print("Mean Age for State",i,"is:",df["age"][df["state"]==i].mean())
    print("Min Age for State",i,"is:",df["age"][df["state"]==i].min())
    print("Max Age for State",i,"is:",df["age"][df["state"]==i].max())
    print("\n")
'''

df_recommendation=df[["user_id","prod_id","Ratings"]]

'''
Products=np.unique(df["prod_id"])
print("The unique product categories are:",Products)
Ratings=np.unique(df["Ratings"])
print("The unique ratings are:",Ratings)
print(df_recommendation.head(5))
'''

def create_popularity_recommendation(train_data, user_id, item_id):
    #Get a count of user_ids for each unique song as recommendation score
    train_data_grouped = train_data.groupby([item_id]).agg({user_id: 'count'}).reset_index()
    train_data_grouped.rename(columns = {user_id: 'score'},inplace=True)
    
    #Sort the songs based upon recommendation score
    train_data_sort = train_data_grouped.sort_values(['score', item_id], ascending = [0,1])
    
    #Generate a recommendation rank based upon score
    train_data_sort['Rank'] = train_data_sort['score'].rank(ascending=0, method='first')
        
    #Get the top 10 recommendations
    popularity_recommendations = train_data_sort.head(10)
    return popularity_recommendations

recommendations = create_popularity_recommendation(df_recommendation,'user_id','prod_id')
print("\nUniversal product recommendations according to the popularity based recommendation")

print(recommendations)
subset = recommendations[['prod_id', 'score']]
tuples = [tuple(x) for x in subset.values]
print (tuples)
import upload_data as ud
#ud.upload_universal(tuples)


import Recommenders as Recommenders
from sklearn.model_selection import train_test_split
train_data, test_data = train_test_split(df_recommendation, test_size = 0.30, random_state=0)
is_model = Recommenders.item_similarity_recommender_py()
is_model.create(train_data, 'user_id', 'prod_id')
user_id = train_data.user_id
user_items = is_model.get_user_items(user_id)
#print("\nItem Based Recommendation to a user with User ID : 1017")
Users = np.unique(df['user_id'])
for id in Users:
	print(id)
	recommendations = is_model.recommend(id)
	print(recommendations)
	subset = recommendations[['user_id', 'product_id']]
	tuples = [tuple(x) for x in subset.values]
	ud.upload_individual(tuples)
