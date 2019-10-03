const formElement = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

formElement.addEventListener;
formElement.addEventListener('submit', function(e) {
  e.preventDefault();
  messageOne.innerHTML = 'Loading';
  messageTwo.innerHTML = '';
  var searchValue = searchElement.value;
  fetch('/weather?address=' + searchValue)
    .then(function(response) {
      response.json().then(function(data) {
        if (data.error) {
          messageOne.innerHTML = data.error;
          messageTwo.innerHTML = '';
        } else {
          console.log(data);
          var {
            address,
            humidity,
            location,
            precipProbability,
            pressure,
            summary,
            temperature,
            windSpeed
          } = data;
          var description = `
         The weather in ${location} is ${summary}
         The temperature is ${temperature} degrees celsius, with a precipitation
         probability of ${100 *
           parseFloat(precipProbability)}% and humidity ${100 *
            parseFloat(
              humidity
            )}%. The pressure is ${pressure}hPs, and wind speed ${windSpeed}m/s
          `;
          messageOne.innerHTML = description;
        }
      });
    })
    .catch(function(err) {
      console.log(err);
    });
});
