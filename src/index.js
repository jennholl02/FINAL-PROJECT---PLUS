let now = new Date();

let timeInput = document.querySelector("#time-input");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let date = now.getDate();

let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
timeInput.innerHTML = ` LOCAL TIME: ${day} ${month} ${date}, ${hours}:${minutes} `;

function showForecast(response) {
  let cityTemp = Math.round(response.data.main.temp);
  let insertTemp = document.querySelector("#current-temp");
  insertTemp.innerHTML = `${cityTemp}℉`;

  weatherDescription(response);
  humidityDescription(response);
  windDescription(response);
  highDescription(response);
  lowDescription(response);
}

function weatherDescription(response) {
  let weatherDescription = response.data.weather[0].description;
  let insertDescription = document.querySelector("#weather-description");
  insertDescription.innerHTML = `${weatherDescription}`;
}

function humidityDescription(response) {
  let humidityDescription = response.data.main.humidity;
  let insertHumidity = document.querySelector("#humidity");
  insertHumidity.innerHTML = ` ${humidityDescription}%`;
}

function windDescription(response) {
  let windDescription = Math.round(response.data.wind.speed);
  let insertWind = document.querySelector("#wind");
  insertWind.innerHTML = ` ${windDescription} mph`;
}

function highDescription(response) {
  let highDescription = Math.round(response.data.main.temp_max);
  let insertHigh = document.querySelector("#daily-high");
  insertHigh.innerHTML = `  ${highDescription} ℉`;
}

function lowDescription(response) {
  let lowDescription = Math.round(response.data.main.temp_min);
  let insertLow = document.querySelector("#daily-low");
  insertLow.innerHTML = `  ${lowDescription} ℉`;
}

function getCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let mainCity = document.querySelector("#main-city");
  let fiveDay = document.querySelector("#five-day");
  mainCity.innerHTML = `${cityInput.value}`;
  fiveDay.innerHTML = `${cityInput.value}`;

  let apiKey = "9eb0f850fd87a403bc76584028e843ca";
  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "imperial";
  let apiUrl = `${endpoint}?q=${cityInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showForecast);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

function showLocalWeather(position) {
  let apiKey = "9eb0f850fd87a403bc76584028e843ca";
  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiUrl = `${endpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  let cityName = "Your Local Area";
  let insertCityName = document.querySelector("#main-city");
  insertCityName.innerHTML = `${cityName}`;

  let fiveCityName = "Your Local Area";
  let insertFiveCityName = document.querySelector("#five-day");
  insertFiveCityName.innerHTML = `${fiveCityName}`;

  axios.get(apiUrl).then(showForecast);
}

function showCurrentWeather() {
  navigator.geolocation.getCurrentPosition(showLocalWeather);
}

let currentWeather = document.querySelector("#current-button");
currentWeather.addEventListener("click", showCurrentWeather);
