---
title: "Titanic Kaggle Competition"
excerpt: "Predicting Survival of Titanic Disaster<br/><img src='https://basilwong.github.io/files/logos/titanic_logo.png' width='200'>"
collection: portfolio
---

At the beginning of this year while we were all social distancing, I suddenly found myself with a whole bunch of free time. I decided to go through the Introduction to Machine Learning course on my younger brother's Code Academy account. Thanks Josh!

![png](https://basilwong.github.io/files/titanic-kaggle-competition/codeacademy-picture.PNG)

Some of the things I learned in the course included Linear and Logistic Regression, Decision Trees, K-Nearest Neighbours, K-Means(++) Clustering and the building blocks of deep learning, Perceptrons.

One of the course's projects was to make a submission to Kaggle's Titanic competition. After going through the course, I decided to comeback to this project and add to it more of what I learned during the course. Check out the actual submission notebook on Kaggle.com [here](https://www.kaggle.com/basilwong/titanic-competition).

## Titanic Competition

In this notebook we're gonna use multiple types of training models to try and find the best predictor of which passengers will survive the Titanic disaster based on data.


```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn import linear_model
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import Perceptron
```

### Analysis of the Data


```python
# Displaying the data
df_train = pd.read_csv("../input/titanic/train.csv")
df_train.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>0</td>
      <td>3</td>
      <td>Braund, Mr. Owen Harris</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>1</td>
      <td>1</td>
      <td>Cumings, Mrs. John Bradley (Florence Briggs Th...</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C85</td>
      <td>C</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>1</td>
      <td>3</td>
      <td>Heikkinen, Miss. Laina</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>1</td>
      <td>1</td>
      <td>Futrelle, Mrs. Jacques Heath (Lily May Peel)</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>113803</td>
      <td>53.1000</td>
      <td>C123</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>0</td>
      <td>3</td>
      <td>Allen, Mr. William Henry</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>373450</td>
      <td>8.0500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
  </tbody>
</table>
</div>




```python
df_train.describe(include='all')
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>891.000000</td>
      <td>891.000000</td>
      <td>891.000000</td>
      <td>891</td>
      <td>891</td>
      <td>714.000000</td>
      <td>891.000000</td>
      <td>891.000000</td>
      <td>891</td>
      <td>891.000000</td>
      <td>204</td>
      <td>889</td>
    </tr>
    <tr>
      <th>unique</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>891</td>
      <td>2</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>681</td>
      <td>NaN</td>
      <td>147</td>
      <td>3</td>
    </tr>
    <tr>
      <th>top</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Becker, Miss. Marion Louise</td>
      <td>male</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>347082</td>
      <td>NaN</td>
      <td>B96 B98</td>
      <td>S</td>
    </tr>
    <tr>
      <th>freq</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1</td>
      <td>577</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>7</td>
      <td>NaN</td>
      <td>4</td>
      <td>644</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>446.000000</td>
      <td>0.383838</td>
      <td>2.308642</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>29.699118</td>
      <td>0.523008</td>
      <td>0.381594</td>
      <td>NaN</td>
      <td>32.204208</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>std</th>
      <td>257.353842</td>
      <td>0.486592</td>
      <td>0.836071</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>14.526497</td>
      <td>1.102743</td>
      <td>0.806057</td>
      <td>NaN</td>
      <td>49.693429</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.420000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>NaN</td>
      <td>0.000000</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>223.500000</td>
      <td>0.000000</td>
      <td>2.000000</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>20.125000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>NaN</td>
      <td>7.910400</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>446.000000</td>
      <td>0.000000</td>
      <td>3.000000</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>28.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>NaN</td>
      <td>14.454200</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>668.500000</td>
      <td>1.000000</td>
      <td>3.000000</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>38.000000</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>NaN</td>
      <td>31.000000</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>max</th>
      <td>891.000000</td>
      <td>1.000000</td>
      <td>3.000000</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>80.000000</td>
      <td>8.000000</td>
      <td>6.000000</td>
      <td>NaN</td>
      <td>512.329200</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



Going through each feature and making an initial analysis/assumption on their correlation and if we should use them for training the model. Additionally if the data itself needs to be cleaned at all.

* PassengerID:
    * Not correlated to survival, will not be used in training.
* Pclass:
    * It is likely that passengers of 'higher class' were prioritized during the disaster. Luckily the values of the passenger class data is categorized into numerical buckets and there aren't any missing values.
* Sex:
    * Women and children were prioritized so this will likely be an important feature for training.
* Name:
    * It is unlikely that name will be useful compared to passenger class. We could possibly group by title or by last name, but the Sex field already has a similar function without having to clean the data and classifying based on the names we train on would be overfitting the model.
* Age:
    * Since women and children were prioritized during the rescue, this is definitely a category we will want to look at. Some values are missing so that will have to be cleaned. We may want to explore bucketing the Age field into age groups.
* SibSp	/ Parch:
    * If we add these together it will get the size of your family that was onboard, it's possible that this could be correlated to survival.
* Ticket:
    * There are too many missing values in ticket, this field will not be used.
* Fare:
    * The fare is correlated with class of the passenger. Since this is the case we will choose the pclass feature.
* Cabin:
    * Again is missing too many values. Will be dropped.
* Embarked:
    * Passengers on the ship may have had their quarters located based on when they embarked in addition to pclass. This may affect their survival rate. The correlation for this category will be explored.


```python
# Analyzing Passenger Class
df_train[['Pclass', 'Survived']].groupby(['Pclass'], as_index=False).mean()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Pclass</th>
      <th>Survived</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>0.629630</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>0.472826</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>0.242363</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Analyzing Sex
df_train[['Sex', 'Survived']].groupby(['Sex'], as_index=False).mean()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Sex</th>
      <th>Survived</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>female</td>
      <td>0.742038</td>
    </tr>
    <tr>
      <th>1</th>
      <td>male</td>
      <td>0.188908</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Analyzing Age
df_train["Agebucket"] = pd.cut(df_train['Age'], 8)
age_analysis_df = df_train[['Agebucket', 'Survived']].groupby(['Agebucket'], as_index=False).mean()
age_analysis_df.plot(x='Agebucket', y='Survived', style='o', figsize=(15,5))
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7fc574ffe128>




![png](https://basilwong.github.io/files/titanic-kaggle-competition/notebook-graph.PNG)


For age we can see that the younger demographic, especially under 10 years old had a better chance of surviving than the other age ranges. Note that since there were few older passengers the mean value is very volitile. Thus the large drop at after 60 years old can be discounted due to lack of data.


```python
df_train[['Agebucket', 'Survived']].groupby(['Agebucket'], as_index=False).mean()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Agebucket</th>
      <th>Survived</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>(0.34, 10.368]</td>
      <td>0.593750</td>
    </tr>
    <tr>
      <th>1</th>
      <td>(10.368, 20.315]</td>
      <td>0.382609</td>
    </tr>
    <tr>
      <th>2</th>
      <td>(20.315, 30.263]</td>
      <td>0.365217</td>
    </tr>
    <tr>
      <th>3</th>
      <td>(30.263, 40.21]</td>
      <td>0.445161</td>
    </tr>
    <tr>
      <th>4</th>
      <td>(40.21, 50.158]</td>
      <td>0.383721</td>
    </tr>
    <tr>
      <th>5</th>
      <td>(50.158, 60.105]</td>
      <td>0.404762</td>
    </tr>
    <tr>
      <th>6</th>
      <td>(60.105, 70.052]</td>
      <td>0.235294</td>
    </tr>
    <tr>
      <th>7</th>
      <td>(70.052, 80.0]</td>
      <td>0.200000</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Analyzing Family Size
df_train['FamilySize'] = df_train['SibSp'] + df_train['Parch'] + 1
df_train[['FamilySize', 'Survived']].groupby(['FamilySize'], as_index=False).mean()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>FamilySize</th>
      <th>Survived</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>0.303538</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>0.552795</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>0.578431</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>0.724138</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>0.200000</td>
    </tr>
    <tr>
      <th>5</th>
      <td>6</td>
      <td>0.136364</td>
    </tr>
    <tr>
      <th>6</th>
      <td>7</td>
      <td>0.333333</td>
    </tr>
    <tr>
      <th>7</th>
      <td>8</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>8</th>
      <td>11</td>
      <td>0.000000</td>
    </tr>
  </tbody>
</table>
</div>



Here the most significant correlation is that having no family member aboard negatively correlates with survival. We can just include this in the training.


```python
# Analyzing Embarked
df_train[['Embarked', 'Survived']].groupby(['Embarked'], as_index=False).mean()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Embarked</th>
      <th>Survived</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>C</td>
      <td>0.553571</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Q</td>
      <td>0.389610</td>
    </tr>
    <tr>
      <th>2</th>
      <td>S</td>
      <td>0.336957</td>
    </tr>
  </tbody>
</table>
</div>



There is enough of a discrepancy between where peple embarked where we can use this as a feature in training.

### Cleaning the Data for Training


```python
def clean_data(training_dataset):
    training_dataset["FirstClass"] = training_dataset["Pclass"].apply(lambda x: 1 if x == 1 else 0)
    training_dataset["SecondClass"] = training_dataset["Pclass"].apply(lambda x: 1 if x == 2 else 0)
    training_dataset["ThirdClass"] = training_dataset["Pclass"].apply(lambda x: 1 if x == 3 else 0)
    training_dataset["SexNum"] = training_dataset["Sex"].map({"male":"0", "female":"1"})
    training_dataset["isChild"] = training_dataset["Age"].apply(lambda x: 1 if x != None and x <= 10 else 0)
    training_dataset['FamilySize'] = training_dataset['SibSp'] + df_train['Parch'] + 1
    training_dataset["embarkedCherbourg"] = training_dataset["Embarked"].apply(lambda x: 1 if x == "C" else 0)
    return training_dataset[["SexNum", "isChild", "FirstClass", "SecondClass", "ThirdClass", "embarkedCherbourg"]]


```


```python
# Training Data and Labels
features = clean_data(df_train)
survived = df_train[["Survived"]]
```


```python
# Train using different types of classifiers.
classifiers = {
    "Logistic Regression" : linear_model.LogisticRegression(),
    "K-Nearest Neighbours" : KNeighborsClassifier(2),
    "Random Forest" : RandomForestClassifier(),
    "Perceptron" : Perceptron()
}

for classifier_name, classifier in classifiers.items():
    model = classifier
    model.fit(features, survived.values.ravel())
    print(classifier_name, model.score(features, survived))

```

    Logistic Regression 0.7901234567901234
    K-Nearest Neighbours 0.8035914702581369
    Random Forest 0.8092031425364759
    Perceptron 0.6644219977553311





```python
# Cleaning the test data using the best classifier.
df_test = pd.read_csv("../input/titanic/test.csv")
test_data = clean_data(df_test)
model = RandomForestClassifier()
model.fit(features, survived.values.ravel())
test_data.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>SexNum</th>
      <th>isChild</th>
      <th>FirstClass</th>
      <th>SecondClass</th>
      <th>ThirdClass</th>
      <th>embarkedCherbourg</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>




```python
prediction = np.array([df_test["PassengerId"].values, model.predict(test_data)])
results = pd.DataFrame({'PassengerId': prediction[0, :], 'Survived': prediction[1, :]})
results.to_csv("submission.csv", index=False)
```
