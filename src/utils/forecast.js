const request = require('request');

const weather = (latitude, longitude, callback) => {
  const urlRequest = `https://api.darksky.net/forecast/fd4e99e6cac29fa21e2dc90b974e74b2/${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}?units=si`;

  request({ url: urlRequest, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services.', undefined);
    } else if (body.error) {
      callback('Not correct input', undefined);
    } else {
      callback(undefined, body.currently);
    }
  });
};

module.exports = weather;
// {
//         currentTemp: response.body.currently.temperature,
//         currentChanceRain: response.body.currently.precipProbability
//       }
