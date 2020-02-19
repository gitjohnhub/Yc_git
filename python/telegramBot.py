#!/usr/bin/env python
# coding: utf-8

# In[5]:


import requests
import json

TOKEN = ''
methodName = {'sendMessage':'/sendMessage','getMe':'/getMe'}

updateurl = 'https://api.telegram.org/bot' + TOKEN + '/getUpdates'
# response = json.loads(requests.get(updateurl).content)
response = requests.get(updateurl).json()
print(response)


# In[6]:


chat_id = response['result'][0]["message"]["chat"]["id"]
print(chat_id)


# In[16]:


endMessageUrl = 'https://api.telegram.org/bot' + TOKEN + '/sendMessage'

postContent1 = {
    'chat_id':chat_id,
    'text':'Personal Info',
    'reply_markup':{
        "inline_keyboard":[[{
            "text":"Personal Blog",
            "url":"https://telegra.ph/vpn-base-on-GCP-02-08"
        }]]
    },
    "parse_mode":"Markdown"

}
postContent2 = {
    "chat_id":chat_id,
    "text":"https://telegra.ph/vpn-base-on-GCP-02-08", 
}
requests.post(sendMessageUrl,json=postContent2)


# In[ ]:




