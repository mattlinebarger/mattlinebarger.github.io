const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');

// App data
const weather = {};
weather.temperature = {
  unit: 'celsius',
};

var tempUnit = CONFIG.weatherUnit;

const KELVIN = 273.15;
// Use your own key for the Weather, Get it here: https://openweathermap.org/
const key = `${CONFIG.weatherKey}`;

// Set Position function
setPosition();

function setPosition(position) {
  if (!CONFIG.trackLocation || !navigator.geolocation) {
    if (CONFIG.trackLocation) {
      console.error('Geolocation not available');
    }
    getWeather(CONFIG.defaultLatitude, CONFIG.defaultLongitude);
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      getWeather(
        pos.coords.latitude.toFixed(3),
        pos.coords.longitude.toFixed(3)
      );
    },
    (err) => {
      console.error(err);
      getWeather(CONFIG.defaultLatitude, CONFIG.defaultLongitude);
    }
  );
}

// Get the Weather data
function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${CONFIG.language}&appid=${key}`;
  // let api = `https://api.openweathermap.org/data/2.5/weather?lat=33.036779&lon=-96.714629&appid=136f918c8cac686f768311d1f103b45e`;

  console.log(api);

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      let celsius = Math.floor(data.main.temp - KELVIN);
      weather.temperature.value =
        tempUnit == 'C' ? celsius : (celsius * 9) / 5 + 32;
      weather.temperature.value = Math.round(weather.temperature.value);
      weather.description = data.weather[0].description.toUpperCase();
      weather.iconId = data.weather[0].icon;
    })
    .then(function () {
      displayWeather();
    });
}

// Display Weather info
function displayWeather() {
  iconElement.innerHTML = `<img src="icons/${CONFIG.weatherIcons}/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span class="darkfg">${tempUnit}</span>`;
  descElement.innerHTML = weather.description;
}
