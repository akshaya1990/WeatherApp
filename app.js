const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){
    console.log(req.body);
    const query = req.body.cityName;
    console.log(query);
    const apiKey = "77f817c2bd435181acc699cb7c0e6344";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + ",us&appid=" + apiKey+ "&units=" + unit;
    // const zipcodeUrl = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&units=" + units + "&APPID=" + apiKey;
   
    https.get(url, function (response) {
        console.log(response.statusCode);
       
        response.on('data', function (data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
            
            res.write("<p> Make the most of this nice weather I generated for you. Or else. </p>");
            res.write("<h2> The weather is currently " + description + " </h2>");
            res.write("<h1> The temperature in "+ query +" is " + temp + " Degrees Celsius.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })
})

