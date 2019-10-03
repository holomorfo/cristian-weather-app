console.log('This is a test');

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
          messageOne.innerHTML = 'Temperature ' + data.temperature;
          messageTwo.innerHTML = 'Precipitation ' + data.precipProbability;
        }
      });
    })
    .catch(function(err) {
      console.log(err);
    });
});
