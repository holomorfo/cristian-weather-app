const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

// Define paths
const publicDirectoryPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', function(req, res) {
  res.render('index', {
    title: 'Weather',
    name: 'Cristian'
  });
});

app.get('/about', function(req, res) {
  res.render('about', {
    title: 'About',
    name: 'Cristian'
  });
});

app.get('/help', function(req, res) {
  res.render('help', {
    title: 'Help',
    message: 'This is the help message'
  });
});

app.get('/weather', function(req, res) {
  if (!req.query.address)
    return res.send({ error: 'You must provide an address' });

  var location = req.query.address;
  geocode(location, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error: 'Not a correct address' });
    forecast(
      latitude,
      longitude,
      (error, { temperature, precipProbability } = {}) => {
        if (error) return res.send({ error: 'Error forecast' });
        res.send({
          temperature,
          location,
          precipProbability,
          address: req.query.address
        });
      }
    );
  });
});

app.get('/help/*', function(req, res) {
  res.render('error', {
    title: '404 error',
    name: 'Cristian',
    message: 'Document page not found'
  });
});

app.get('*', function(req, res) {
  res.render('error', {
    title: '404 error',
    name: 'Cristian',
    message: '404 not found'
  });
});

app.listen(3001, function() {
  console.log('Server is up in port 3001');
});
