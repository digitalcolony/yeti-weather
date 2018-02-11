require('dotenv').config()
const express = require("express");
const fs = require("fs");
const weather = require("./weather/weather.js");

var app = express();
const port = process.env.PORT || 3000;

//hardcode Seattle for now
const lat = 47.60;
const lng = -122.32;

// server log
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log + "\n", err => {
        if (err) {
            console.log("Unable to append.");
        }
    });
    next();
});

app.get("/", (req, res) => {
    var weatherTime = new Date().timeNow(); // TODO: Add to weatherResults
    weather.getWeather(lat, lng,
        (errorMessage, weatherResults) => {
            if (errorMessage) {
                res.status(400).send(errorMessage);
            } else {
                res.status(200).send(`Seattle Temperature: <br>${Math.round(
                    weatherResults.temperature )} F at ${weatherTime}`);
            }
        });
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    res.status(404).send('404 Page Not Found');
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});


// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}

module.exports = {
    app
};