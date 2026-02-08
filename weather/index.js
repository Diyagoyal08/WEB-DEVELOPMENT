 // =============================
// API KEY
// =============================
const apiKey = "bc906f7124517873ea6afa6c0e46cbca";

// =============================
// DOM ELEMENTS
// =============================
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const dateEl = document.getElementById("date");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const icon = document.getElementById("weatherIcon");

// =============================
// DATE FORMATTER
// =============================
function getDate() {
  const d = new Date();
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short"
  });
}

// =============================
// FETCH WEATHER
// =============================
async function getWeather(city) {
  try {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    // Show REAL error message
    if (!response.ok) {
      throw new Error(data.message);
    }

    const weatherMain = data.weather[0].main.toLowerCase();

// List of possible weather classes
const weatherClasses = [
  "clear",
  "clouds",
  "rain",
  "thunderstorm",
  "snow",
  "mist"
];

// Remove only weather classes
document.body.classList.remove(...weatherClasses);

// Add new one
document.body.classList.add(weatherMain);


    // =============================
    // UPDATE UI
    // =============================
    cityName.textContent = data.name;
    dateEl.textContent = getDate();

    temperature.textContent = Math.round(data.main.temp) + "°";
    description.textContent = data.weather[0].description;

    humidity.textContent = data.main.humidity + "%";
    wind.textContent = data.wind.speed + " km/h";
    feelsLike.textContent = Math.round(data.main.feels_like) + "°";

    icon.src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  } catch (err) {
    alert("Error: " + err.message);
  }
}

// =============================
// EVENTS
// =============================

// Button click
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

// Enter key search
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
