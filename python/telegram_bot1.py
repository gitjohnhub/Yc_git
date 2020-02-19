import requests
import json
from telegraph import Telegraph

TOKEN = ''
methodName = {'sendMessage':'/sendMessage','getMe':'/getMe'}

updateurl = 'https://api.telegram.org/bot' + TOKEN + '/getUpdates'
response = json.loads(requests.get(updateurl).content)
print(response)
chat_id = response['result'][0]["message"]["chat"]["id"]
print(chat_id)
sendMessageUrl = 'https://api.telegram.org/bot' + TOKEN + '/sendMessage'

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
postContent2 = "https://telegra.ph/vpn-base-on-GCP-02-08"
requests.post(sendMessageUrl,data=postContent2)