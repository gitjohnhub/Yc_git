var cheerio = require('cheerio');
var https = require('https');
var iconv = require('iconv-lite');


var index = 1;
var titles = [];
var btlinks = [];
var url = 'https://www.ygdy8.net/html/gndy/dyzz/list_23_';
function getTitle(url,i) {
  console.log("正在获取第" + i + "页的内容");
  https.get(url + i + '.html', function(sres) {
    var chunks = [];
    sres.on('data', function(chunk) {
      chunks.push(chunk);
    });
    sres.on('end', function() {
      var html = iconv.decode(Buffer.concat(chunks), 'gb2312');
      var $ = cheerio.load(html, {decodeEntities: false});
      $('.co_content8 .ulink').each(function (idx, element) {
        var $element = $(element);
        getBtLink($element.attr('href'));
        // console.log(btlink)
        titles.push({
          title: $element.text(),
          url:$element.attr('href'),
        });
      });
      if(i<1){
        getTitle(url,++index);
      }else{
        console.log(titles)
      }
    });
  });
};

function getBtLink(url){
  https.get('https://www.ygdy8.net' + url,function(res){
    var chunks =[];
    res.on('data',function(chunk){
      chunks.push(chunk);
    });
    res.on('end',function(){
      var html = iconv.decode(Buffer.concat(chunks),'gb2312');
      var $ = cheerio.load(html,{decodeEntities:false});
      $('#Zoom td').children('a').each(function (idx,element){
        var $element = $(element);
        btlinks.push($element.attr('href'));
      })
    })
  })
}

function main() {
  console.log("开始爬取");
  getTitle(url,index);
  setTimeout(() => {
    console.log(btlinks)
  }, 10000);
}


main();
