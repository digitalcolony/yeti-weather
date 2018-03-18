require("dotenv").config();
const express = require("express");
const pug = require("pug");
const weather = require("./weather/weather.js");

var app = express();
const port = process.env.PORT || 3000;

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.use("/css", express.static(__dirname + "/css"));
app.use("/font", express.static(__dirname + "/font"));

//hardcode Seattle for now
const lat = 47.6;
const lng = -122.32;

app.get("/", (req, res) => {
  weather.getWeather(lat, lng, (errorMessage, weatherResults) => {
    if (errorMessage) {
      res.status(400).send(errorMessage);
    } else {
      res.render("index", {
        temperature: `${Math.round(weatherResults.temperature)} F`,
        iconClass: weatherResults.iconClass,
        icon: weatherResults.icon,
        forecastTime: weatherResults.momentTime
      });
    }
  });
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get("*", function(req, res) {
  res.status(404).send("404 Page Not Found");
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};
