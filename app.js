const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config()

const app =  express();
app.use(bodyParser.urlencoded({extended:true}));
const https = require("https");

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    const key = process.env.API_KEY;
    var city  = req.body.c1;
    console.log(city);
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units=metric";

    https.get(url,function(responce) {
        responce.on("data",function(data){
            const wdata = JSON.parse(data);
            console.log(wdata);
            const temp = wdata.main.temp;
            const condi = wdata.weather[0].icon;
            console.log(condi);
            const icon = "https://openweathermap.org/img/wn/"+condi+"@2x.png"
            res.write("<h1>the temprature is "+temp+"</h1><br>");
            res.write("<img src ="+icon+">");
        })
    })
    console.log("the request has been made!");
    
})
app.listen(process.env.PORT || 3000,function(){
    console.log("the server is running on port 3000");
})
