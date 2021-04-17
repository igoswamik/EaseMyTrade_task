const {PythonShell} = require('python-shell');
const express=require('express');
const path=require('path');
const ejsMate=require('ejs-mate');
const app=express();

let pyshell = new PythonShell('scriptGainer.py');
let pyshell2=new PythonShell('scriptLooser.py')

app.engine('ejs',ejsMate);// we tell express thats the one we wanna use istead the default one
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true})); //it will parse the req body for us
app.use(express.static(path.join(__dirname,'public'))); //telling express to serve one public directory named public

let gmsg;
let lmsg;
pyshell.on('message', function(message) {
  gmsg=message;
    console.log('got gaining stock data');
  })
  pyshell.end(function (err) {
    if (err){
      throw err;
    };
    console.log('finished1');
  });

  pyshell2.on('message', function(message) {
      lmsg=message;
    console.log('got loosing stock data');
  })
  pyshell2.end(function (err) {
    if (err){
      throw err;
    };
    console.log('finished2');
  });



app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/lossData',(req,res)=>{
    const pageTitle='Loosing Stock';
    const msg=lmsg;
    res.render('show',{msg,pageTitle});
})
app.get('/gainData',(req,res)=>{
    const pageTitle='Gaining Stock'
    const msg=gmsg;
    res.render('show',{msg,pageTitle});
})

app.listen(3000,()=>{
    console.log("serving on port 3000");
})