/* Logic for Showing Images */
function categorizeWeatherImage(condition) {
  const lowerCondition = condition.toLowerCase();

  if (lowerCondition.includes("clear")) {
    return "images/clear.png";
  } else if (
    lowerCondition.includes("cloud") ||
    lowerCondition.includes("overcast")
  ) {
    return "images/clouds.jpg";
  } else if (
    lowerCondition.includes("rain") ||
    lowerCondition.includes("drizzle")
  ) {
    return "images/rain.jpg";
  } else if (
    lowerCondition.includes("snow") ||
    lowerCondition.includes("sleet")
  ) {
    return "images/snow.jpg";
  } else if (lowerCondition.includes("thunderstorm")) {
    return "images/thunder.jpg";
  } else {
    return "images/clear.png";
  }
}

/* Common Logic for rendering Weather Data */
function renderWeather(data) {
  const condition = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const conditionImage = categorizeWeatherImage(condition);
  console.log(iconCode);
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  document.getElementById("city").innerText = data.name;
  document.getElementById("cel").innerText = Math.round(
    data.main.temp - 273.15
  );
  document.getElementById("far").innerText = Math.round(
    (data.main.temp - 273.15) * 1.8 + 32
  );
  document.getElementById("speed").innerText = data.wind.speed + " m/s";
  document.getElementById("humidity").innerText = data.main.humidity + "%";
  document.getElementById("pressure").innerText = data.main.pressure + " hPa";
  document.getElementById("visibility").innerText = data.visibility + " m";

  document.getElementById("condition").textContent = condition.toUpperCase();
  document.getElementById("weather-icon").src = conditionImage;
}

/* Fetching Weather Data Based on City*/
function fetchWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3cbba87794edae3feca279861aa17155`
  )
    .then((response) => response.json())
    .then((data) => {
      renderWeather(data);
    })
    .catch((error) => {
      document.getElementById("condition").textContent = "City Not Found";
      document.getElementById("city").innerText = "City Not Found";
    });
}

/* Function to get Weather Data Based on User's Input City */
function citySearch() {
  let city = document.getElementById("cityInput").value;
  fetchWeather(city);
}

/* Function to get Weather Data Based on User's Location */
async function getMyCoord() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(lat, lon);
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3cbba87794edae3feca279861aa17155`
    );
    let data = await response.json();
    renderWeather(data);
  });
}