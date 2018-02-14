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
                    <p><em>at ${weatherResults.momentTime}</em></p>`;
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

module.exports = {
    app
};