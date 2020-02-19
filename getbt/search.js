
var cheerio = require('cheerio')
var https = require('https')
var querystring = require('querystring')
const {clipboard} = require('electron')

const feipaiButton = document.getElementById('fenpai')
const searchInput = document.getElementById('search-input')
const btList = document.getElementById('bt-list')
const dybeeButton = document.getElementById('dybee')
document.onkeydown =function(e){
    if(e.keyCode == 13) {
        feipaiButton.click()
    }
}
dybeeButton.addEventListener('click',()=>{
    getdybeebt(searchInput.value)
})
feipaiButton.addEventListener('click',()=>{
    if (searchInput.value !== ''){
        getBtLink(searchInput.value)
    }else{
        searchInput.placeholder = '请输入电影名!'
    }
});
//ttmeiju.tv
function postdybee(searchText){
    var postdata =  querystring.stringify({
        'searchword':decodeURI(searchText)
    }) 
    var options = {
        hostname:'www.meijutt.tv',
        port:80,
        path:'/search/index.asp',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Content-Length': postdata.length
        }
    };
    var req = https.request(options,function(res,error){
        console.log(res.statusCode);
    });
    req.write(postdata);
    req.end();
};


function getdybeebt(searchText){
    var dybeeBtList = [];
    var dybeeurl = 'https://www.dybee.tv/?post_type=post&s='+decodeURI(searchText);
    https.get(dybeeurl,function(res,error){
        // console.log(res.statusCode);
        var chunks =[];
        res.on('data',function(chunk){
            chunks.push(chunk);
        });
        res.on('end',function(){
            var btLinks =[]
            var html = Buffer.concat(chunks);
            var $ = cheerio.load(html, {decodeEntities: false});
            $('.user_list_kz').each(function(element){
                var $element = $(element);
                // console.log($element.attr('title'))
                // var detailLink = $element.attr('href');
                getDetaildybee($element.attr('href'),$element.attr('title'));
            });
        });
    });
}
function getDetaildybee(detailLink,title){
    https.get(detailLink,function(res,error){
        console.log(res.statusCode);
        var chunks =[];
        res.on('data',function(chunk){
            chunks.push(chunk);
        });
        res.on('end',function(){
            var btLinks =[]
            var html = Buffer.concat(chunks);
            var $ = cheerio.load(html, {decodeEntities: false});
            $('page_ullist cl').children('a').each(function(element){
                var $element = $(element);
                console.log(title+'在线地址:'+$element.attr('href'));
            });
        });
    })
};
// 分派影视
function getBtLink(searchText){
    searchText = decodeURI(searchText);
    var url = 'https://ifenpaidy.com/page/'+searchText
    https.get(url,function(res,error){
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
                var p = btList.querySelectorAll('.btButton');
                if (p.length !== 0){
                    var childs = btList.childNodes; 
                    for(var i = childs .length - 1; i >= 0; i--) {
                        btList.removeChild(childs[i]);
                    }
                }
                addBtList(btLinks);
            })
        }else{
            const notification = {
                title: '请联系管理员',
                body: '连接该电影网站失败code:'+res.statusCode
              }
            const copyNotification = new window.Notification(notification.title,notification)
        }
    })
};

function addBtList(btLinks){
    if (btLinks.length===0){
        var btButton = document.createElement('button');
        btButton.className = 'bt-button'
        btButton.innerHTML = '没有该资源'
        btButton.disabled =true
        btList.appendChild(btButton)
    }else{
        for (var i=0;i<btLinks.length;i++){
            var btButton = document.createElement('button');
            btButton.addEventListener('click',(event)=>{
                copyBt(event)
            });
            btButton.className = 'bt-button';
            btButton.innerHTML = btLinks[i];
            btList.appendChild(btButton);
        }
    }

}

function copyBt(event){
    const btLink = event.target.innerHTML
    var copyText;
    const reMagnet = /(magnet:.*)/;
    const reBaidupan = /((https:\/\/([0-9a-zA-Z\\\/\.\_])*))/;
    const reFtp = /(ftp:.*)/;

    if(btLink.indexOf('magnet') !== -1){
        var magnet = reMagnet.exec(btLink)[0];
        copyText = magnet;
    }else if(btLink.indexOf('https:\/\/') !== -1){
        var baidupan = reBaidupan.exec(btLink)[0];
        copyText = baidupan;
    }else if(btLink.indexOf('ftp') !== -1){
        var ftptxt = reFtp.exec(btLink)[0];
        copyText = ftptxt;
    }else{
        copyText = btLink;
    }
    clipboard.writeText(copyText);
    const notification = {
        title: '已复制',
        body: copyText
      }
    new window.Notification(notification.title,notification);
}