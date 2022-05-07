const express = require("express");
const app = express();
var https =require("https");
var cors = require('cors');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
 
app.get("/",function(req,res) {
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    var cityName = req.body.cityName;
    var query = cityName;
    var apikey="585861f0bf95483b2174f115222c201b";
    var unit ="metric";
     const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
    //const url1 = new URL('https://api.openweathermap.org/data/2.5/weather?q=vizianagaram,india&appid=585861f0bf95483b2174f115222c201b&units=metric');
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
           const weatherData=JSON.parse(data);
           const temp = weatherData.main.temp;
           const weatherDesc= weatherData.weather[0].description;
           const icon = weatherData.weather[0].icon;
           const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
           console.log(temp+" "+weatherDesc);
           res.set("Content-Type", "text/html");
           res.write("<h1>The temperature in "+cityName+" is "+temp+" and feels like "+weatherDesc+"</h1>");
           res.write("<img src="+imgUrl+">");
           res.send(); 
        })
    });
   // res.send("cityName "+cityName);
});






app.listen(3000,function () {
    console.log("server started and running on port 3000");
});