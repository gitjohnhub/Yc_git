const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")

const app = express()
app.use(bodyParser.json())
const wx = {
    appid:"",
    secret:""
}

var db = {
    session:{},
    user:{}
}

app.post('/login',(req,res)=> {
    console.log('login code:' + req.body.code)
    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + wx.appid +'&secret=' + wx.secret + '&js_code=' + req.body.code + '&grant_type=authorization_code'
    request(url,(err,response,body)=>{
        console.log('session:' + body)
        if (session.openid){
            var session = JSON.parse(body)
            var token = 'token_' + newDate().getTime()
            db.session[token] = session
            if (!db.user[session.openid]){
                db.user[session.openid]={credit:100}
            }
        }
        res.json({token:token})
    })
})

app.listen(3000,()=>{
    console.log("server running at http://127.0.0.1:3000")
})