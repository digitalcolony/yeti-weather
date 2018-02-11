const request = require("request");

//hardcode Seattle for now
const lat = 47.60;
const lng = -122.32;

var getWeather = (lat, lng, callback) => {
    request({
            url: `https://api.darksky.net/forecast/${process.env.FORECAST_API_KEY}/${lat},${lng}`,
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