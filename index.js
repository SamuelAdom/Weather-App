    const searchBox = document.getElementById("searchBox");
    const searchIcon = document.getElementById("searchIcon");
    const cityName = document.getElementById("cityName");
    const weatherTemp = document.getElementById("weatherTemp");
    const weatherIcon = document.getElementById("weatherIcon");
    const displayHum = document.getElementById("displayHum");
    const displayWind = document.getElementById("displayWind");
    const displayError = document.getElementById("displayError");

    const API_KEY='f3705c4f79bbcc3f4a397239ee5aa3df';
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  
    function fetchWeatherData(city) {
      const url = `${baseUrl}?q=${city}&appid=${API_KEY}&units=metric`;
  
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("City not found 😥");
          }
          return response.json();
        })
        .then((data) => {
          updateWeatherInfo(data);
        })
        .catch((error) => {
          displayError.textContent = error.message;
          resetWeatherInfo();
        });
    }
  
    function updateWeatherInfo(data) {
      displayError.textContent = ""; 
      cityName.textContent = data.name;
      weatherTemp.textContent = `${data.main.temp.toFixed(0)}°C`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherIcon.alt = data.weather[0].description;
      displayHum.textContent = `Humidity: ${data.main.humidity}%`;
      displayWind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    }
  
    function resetWeatherInfo() {
      cityName.textContent = "";
      weatherTemp.textContent = "";
      weatherIcon.src = "";
      weatherIcon.alt = "";
      displayHum.textContent = "";
      displayWind.textContent = "";
    }
    fetchWeatherData("Accra");
    searchBox.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
          fetchWeatherData(city);
        }
      }
    });
  
    searchIcon.addEventListener("click", () => {
      const city = searchBox.value.trim();
      if (city) {
        fetchWeatherData(city);
      }
    });

  