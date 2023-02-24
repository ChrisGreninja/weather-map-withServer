
const express = require("express");
const app = express();
const https = require("https");
app.use(express.static("public"));
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//////////////


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  
});

app.get('/script.js', function(req, res) {
  res.sendFile(__dirname + '/script.js');
});

app.post('/submit-value', function(req, res) {
  const lat = req.body.lat;
  const lon = req.body.lon;
  
  if(lat!=undefined && lon!=undefined){
    let url1 ="https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=d138353ade952c62f7ac88388b24f148&units=metric"; 
    https.get(url1, function (response) {
      response.on("data", function (data) {
      var data1 = JSON.parse(data);
      res.send(data1);
      });
  
    });
  }
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
