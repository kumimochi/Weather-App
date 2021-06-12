const api = {
  key: 'b43d7bc10568650ca8f7ba15475b8368',
};

//input
const search = document.querySelector('#search');
search.addEventListener('keypress', setCity);

//getting input value
function setCity(e) {
  if (e.keyCode === 13) {
    getWeather(search.value);
    console.log(search.value);
    search.value = '';
  }
}

//getting the input value when the search icon is clicked
const searchIcon = document
  .querySelector('.fa-search')
  .addEventListener('click', () => {
    getWeather(search.value);
    console.log(search.value);
    search.value = '';
  });

//getting data from the api
function getWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&id=524901&appid=${api.key}`
  )
    .then((data) => {
      return data.json();
    })
    .then(displayWeather);
}

function displayWeather(data) {
  console.log(data);

  //displays city and country
  let city = document.querySelector('#city');
  city.innerText = `${data.name}`,;

  let country = document.querySelector('#country');
  country.innerText = `${data.sys.country}`;

  // let location = document.querySelector("#city #country");
  // location.innerText = `${data.name}, ${data.sys.country}`;

  //displays the current temperature
  let temp = document.querySelector('#current-temp');
  temp.innerHTML = `${Math.floor(data.main.temp)}°c`;

  //displays the minimum temp and maximum temp
  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(data.main.temp_min)}°c  / ${Math.round(
    data.main.temp_max
  )}°c`;

  //displays the weather description
  let weather = document.querySelector('#weather');
  weather.innerText = `${data.weather[0].description}`;

  //displays the humidity
  let humidity = document.querySelector('#humidity');
  humidity.innerText = `humidity: ${data.main.humidity}%`;

  //displays the wind speed
  let wind = document.querySelector('#wind-speed');
  wind.innerText = `wind speed: ${data.wind.speed}km/h`;

  //displays and updates the icon based on the weather description
  let icon = document.querySelector('.icon');
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}
