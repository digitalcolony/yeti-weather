const request = require("request");
const config = require("../config.json");

var getWeather = (lat, lng, callback) => {
    request({
            url: `https://api.darksky.net/forecast/${config.FORECAST_API_KEY}/${lat},${lng}`,
            json: true
        },
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                callback(undefined, {
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            } else {
                callback("Unable to fetch the weather");
            }
        }
    );
};

module.exports.getWeather = getWeather;