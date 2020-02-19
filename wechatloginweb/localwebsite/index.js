const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.post('/',(req,res)=>{
  console.log(req.body)
  res.json(req.body)
})
var data = {
  name:"张三",
  gender:[
    {name:"男",value:"0",checked:true},
    {name:"女",value:"1",checked:false}
    ],
  skills:[
    { name: 'HTML', value: "html", checked: true },
    { name: 'CSS', value: "css", checked: true },
    { name: 'JS', value: "js", checked: true },
    { name: 'PS', value: "ps", checked: false },
    ],
  opinion:"测试"
}
app.get('/',(req,res)=>{
  res.json(data)
})

app.listen(3000,()=>{
  console.log('server running at http://127.0.0.1:3000')
})
