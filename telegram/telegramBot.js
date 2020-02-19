//ssh root@34.94.133.198
// cd /home/gguiyc_gmail_com/bot
// nano index.js
// pm2 restart 0

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
var cheerio = require('cheerio');
var https = require('https');


const TOKEN = '';
const url = 'https://yc001.gq';
const port = 9000;

const bot = new TelegramBot(TOKEN);
bot.setWebHook(`${url}/bot${TOKEN}`);
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});

// send iosmanual
bot.onText(/\/iosmanual/, (msg)=> {
    bot.sendMessage(msg.chat.id, 'https://www.notion.so/nohotpot/ios-8423972def2440f596d2dd1f975d633e');
});
// send windowsmanual
bot.onText(/\/windowsmanual/,(msg)=> {
    bot.sendMessage(msg.chat.id, 'https://www.notion.so/nohotpot/windows-11f8db1fbef947719f9c679e11de7eb5')
});
// send macmanual
bot.onText(/\/macmanual/,(msg)=> {
    bot.sendMessage(msg.chat.id, 'https://www.notion.so/nohotpot/mac-5375df7449644fd4b623732d030968e6')
});

// send movie
bot.onText(/\/so (.+)/,(msg,match)=>{
  var searchText = encodeURI(match[1]);
  var options = {
      hostname:'www.douban.com',
      path:'/search?cat=1002&q=' + searchText,
      headers:{
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36',
          'Host':'www.douban.com',
      }
  }
  var chunks = [];
  https.get(options,function(res,error){
      if (!error && res.statusCode == 200){
        res.on('data',function(chunk){
            chunks.push(chunk);
        });
        res.on('end',function(){
            var data = Buffer.concat(chunks);
            var html = data.toString();
            var $ = cheerio.load(html, {decodeEntities: false});
            var movieInfo = {
                name: $('.result-list>.result:first-child a').text(),
                rating_nums:$('.result-list>.result:first-child .rating_nums').text(),
                subject_cast:$('.result-list>.result:first-child .subject-cast').text(),
                textInfo:$('.result-list>.result:first-child p').text(),
                imgLink:$('.result-list>.result:first-child img').attr('src'),
                doubanLink:$('.result-list>.result:first-child a.nbg').attr('href'),
            };
            if (movieInfo['name'].length ==0){
                bot.sendMessage("sorry没有此资源")
            }else {
                bot.sendMessage(msg.chat.id,'电影名称:'+movieInfo['name']+'\n'+'评分:'+movieInfo['rating_nums']+'\n'+'上映信息:'+movieInfo['subject_cast']+'\n'+'简介:'+movieInfo['textInfo']+'\n'+'封面获取:'+movieInfo['imgLink']+'\n'+'直达豆瓣:'+movieInfo['doubanLink']);
            }
        })
      }else{
        bot.sendMessage('失败了，响应码'+res.statusCode+'请联系真人Gyc')
    }
  })
});
// send bt
bot.onText(/\/bt (.+)/,(msg,match)=>{
    var searchText = encodeURI(match[1]);
    var ifenpaiUrl = 'https://ifenpaidy.com/page/'+searchText
    var options = {
        hostname:'https://ifenpaidy.com',
        path:'/page/' + searchText,
        headers:{
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15',
            'Host':'ifenpaidy.com',
        }
    }
    https.get(ifenpaiUrl,function(res,error){
        console.log(res.statusCode)
        if (!error && res.statusCode == 200) {
            var chunks =[];
            res.on('data',function(chunk){
                chunks.push(chunk);
            });
            res.on('end',function(){
                var btLinks =[]
                var html = Buffer.concat(chunks);
                var $ = cheerio.load(html, {decodeEntities: false});
                var btInfo = $('.ul-group .btlink').each(function(idx,element){
                    var $element = $(element);
                    btLinks.push($element.text())
                })
                if (btLinks.length===0){
                    bot.sendMessage(msg.chat.id,'sorry没有该资源')
                }else{
                    btLinks.sort();
                    console.log(btLinks.join('\n'));
                    bot.sendMessage(msg.chat.id,btLinks.join('\n\n'));
                }
            })
        }else{
            bot.sendMessage(msg.chat.id,'失败了，响应码'+res.statusCode+'请联系真人Gyc')
        }
    })

});

bot.onText(/\/echo (.+)/, (msg, match) => {
  const resp = match[1];
  bot.sendMessage(msg.chat.id, resp);
});

