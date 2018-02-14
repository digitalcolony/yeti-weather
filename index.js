require('dotenv').config()
const express = require("express");
const weather = require("./weather/weather.js");

var app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/'));

//hardcode Seattle for now
const lat = 47.60;
const lng = -122.32;

app.get("/", (req, res) => {

    weather.getWeather(lat, lng,
        (errorMessage, weatherResults) => {
            if (errorMessage) {
                res.status(400).send(errorMessage);
            } else {
                var weatherReport = `
                    <h1>Yeti Weather</h1>
                    <h2>Seattle: ${Math.round(weatherResults.temperature )} F</h2>
                    <img src="${weatherResults.iconImage}" title="${weatherResults.icon}" alt="${weatherResults.icon}">
                    <p><em>at ${timeConverter(weatherResults.time)}</em></p>`;
                res.status(200).send(weatherReport);
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

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var time = month + ' ' + date + ', ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}
module.exports = {
    app
};