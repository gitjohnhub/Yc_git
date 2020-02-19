#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import folium
import requests

activityData = pd.read_csv('')
activityData


# In[2]:


def getGeoCode(location):
    par = {'address':location,'key':'','city':'上海'}
    url ='https://restapi.amap.com/v3/geocode/geo'
    response = requests.get(url,par).json()
    if response['count'] == "0":
        geoCode = [0,0]
    else:
        geoCode=response['geocodes'][0]['location'].split(",")
    return geoCode[0],geoCode[1]


# In[3]:


activityDf = pd.DataFrame(activityData)
activityDf['geoCodeX'] = activityDf.Location.apply(lambda x:getGeoCode(x)[0])
activityDf['geoCodeY'] = activityDf.Location.apply(lambda x:getGeoCode(x)[1])
activityDf.drop('452742',axis=1)


# In[6]:



incidents = folium.map.FeatureGroup()
for lat,lng in zip(activityData.geoCodeY,activityData.geoCodeX):
    incidents.add_child(
        folium.CircleMarker(
            [lat, lng],
            radius=7,
            color='yellow',
            fill=True,
            fill_color='red',
            fill_opacity=0.4
        )
    )
sh_location = (31.2304, 121.4737)
sh_map = folium.Map(location = sh_location,zoom_start = 12)
sh_map.add_child(incidents)

latitudes = list(activityData.geoCodeY)
longitudes = list(activityData.geoCodeX)
labels = list(activityData.Event)

for lat,lng,label in zip(latitudes,longitudes,labels):
    folium.Marker([lat,lng],popup=label).add_to(sh_map)
sh_map.add_child(incidents)


# In[ ]:




