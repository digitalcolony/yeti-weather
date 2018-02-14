const request = require("request");
const moment = require("moment-timezone");

var getWeather = (lat, lng, callback) => {
    request({
            url: `https://api.darksky.net/forecast/${process.env.FORECAST_API_KEY}/${lat},${lng}`,
            json: true
        },
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                callback(undefined, {
                    time: body.currently.time, // UNIX time in seconds
                    timezone: body.timezone,
                    momentTime: moment.tz((body.currently.time * 1000), body.timezone).format("YYYY-MM-DD HH:mm"),
                    summary: body.currently.summary,
                    icon: body.currently.icon,
                    iconImage: getWeatherIconImage(body.currently.icon),
                    precipIntensity: body.currently.precipIntensity,
                    precipProbability: body.currently.precipProbability,
                    humidity: body.currently.humidity,
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            } else {
                callback("Unable to fetch the weather");
            }
        }
    );
};

function getWeatherIconImage(icon) {
    var weatherIcons = {
        "clear-day": "images/256/Sunny.png",
        "clear-night": "",
        "rain": "images/256/rain.png",
        "snow": "images/256/snow.png",
        "sleet": "images/256/Showers.png",
        "wind": "",
        "fog": "images/256/Fog.png",
        "cloudy": "images/256/Cloudy.png",
        "partly-cloudy-day": "images/256/Sunny-Interval.png",
        "partly-cloudy-night": "",
        "hail": "images/256/Hail.png",
        "thunderstorms": "images/256/Thunderstorms.png",
        "tornado": ""
    };
    var weatherIconImage = weatherIcons[icon];
    if (weatherIconImage === "") {
        weatherIconImage = "images/256/Sunny.png";
    }
    return weatherIcons[icon];
}

module.exports.getWeather = getWeather;