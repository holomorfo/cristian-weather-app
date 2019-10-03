const request = require('request');

const geocode = (address, callback) => {
  const urlGeo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaG9sb21vcmZvIiwiYSI6ImNrMTZxaXZyMTEwZ3EzYm5peDF6bGg5bGIifQ.fnCCxPBfz2xv0tZI_JMiOw&limit=1`;

  request({ url: urlGeo, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services.', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location.', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
