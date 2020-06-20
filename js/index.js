const api = {
  key: "673e9ba7a43e84ad6f939fe151cff96b",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);
let date = document.querySelector(".location .date");
let now = new Date();
date.innerText = dateBuilder(now);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
    .then((weather) => {
      console.log(weather);
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log("weather", weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name},${weather.sys.country}`;
  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(
    convertKelvinToCelsius(weather.main.temp)
  )}<span>°c</span>`;
  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;
}

function convertKelvinToCelsius(kelvin) {
  if (kelvin < 0) {
    return "below absolute zero (0 K)";
  } else {
    return kelvin - 273.15;
  }
}

function dateBuilder(d) {
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}
