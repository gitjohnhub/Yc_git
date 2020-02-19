# -*- coding:utf-8 -*-
import urllib
import requests
import json
import numpy as np
import cv2

def getCorrectLotteryNum():
      hearders = {
      'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Mobile/15E148 Safari/604.1',
      'Host': 'www.cwl.gov.cn',
      'Referer': 'http://www.cwl.gov.cn/',
      'X-Requested-With':'XMLHttpRequest',
      }
      cookies = {
            "cookie_name": "Sites=_21; UniqueID=Cbo7S0loYrkfVQwS1579602265136; 21_vq=15; _ga=GA1.3.1881906904.1579602267; _gid=GA1.3.1203339550.1579602267; _Jo0OQK=732DABF17F7DFB973E197A3D2EBF86022DDDE3DE9762B4EBFAA3B4F919FDB1C60C91D44F7537764061A46E7F0160CD850C1CECAD0E687301DDB9EF7CA8481F8AB32F1B3C19C5B2FC5F8E6E66EDA7420CD4BE6E66EDA7420CD4B9BF466CCD71185B96D22A5CAB3468914GJ1Z1JA==",
      }
      url = "http://www.cwl.gov.cn/cwl_admin/kjxx/findDrawNotice?name=ssq&issueCount=1"
      response1 = requests.get(url,headers = hearders,cookies = cookies)
      lotteryData = json.loads(response1.text)
      red = lotteryData.get("result")[0].get("red").split(',')
      blue = lotteryData.get("result")[0].get("blue")
      lotteryDate = lotteryData.get("result")[0].get("date")
      print("Date:",lotteryDate,"red:",red,"blue:",blue)
      return red,blue

def getUserLotteryNum():
      countRed = 0
      countBlue = 0
      red,blue = getCorrectLotteryNum()
      userLotteryNum = input("Please enter your lottery number split by space:").split(" ")
      for num in range(0,len(userLotteryNum)-1):
            if userLotteryNum[num] in red:
                  countRed += 1
      if blue == userLotteryNum[len(userLotteryNum) - 1]:
            countBlue += 1
      print("red:",countRed,"blue:",countBlue)
      rule(countRed,countBlue)

def rule(countRed,countBlue):
      if countBlue == 1:
            if countRed == 6:
                  print("卧槽，6+1,一等奖，发家致富")
            elif countRed == 5:
                  print("5+1：¥3000")
            elif countRed == 4:
                  print("4+1：¥200")
            elif countRed == 3:
                  print("3+1：¥10")
            else:
                  print("2+1or1+1or0+1：¥5")
      else:
            if countRed == 6:
                  print("卧槽，6+0，当期一等奖的25%")
            elif countRed == 5:
                  print("5+0：¥200")
            elif countRed == 4:
                  print("4+0：¥100")
                  print("啥也没中，再接再厉")


getUserLotteryNum()