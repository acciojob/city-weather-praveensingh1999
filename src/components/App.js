import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  // ✅ Put API key directly here
  const API_KEY = "086d9464daddd3ef42fa4f97bcac9b6f";

  // ✅ Use HTTPS for API calls to avoid mixed content errors on Vercel
  const search = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
        );
        setWeather(response.data);
        setQuery("");
      } catch (error) {
        alert("City not found or invalid API key.");
        console.error(error);
      }
    }
  };

  // ✅ Kelvin → Celsius or Fahrenheit conversion
  const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);
  const kelvinToFahrenheit = (k) => (((k - 273.15) * 9) / 5 + 32).toFixed(1);

  return (
    <div className="app">
      <input
        type="text"
        className="search"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={search}
      />

      {weather && (
        <div className="weather">
          <div className="city">{weather.name}</div>
          <div className="temperature">
            {kelvinToCelsius(weather.main.temp)}°C / {kelvinToFahrenheit(weather.main.temp)}°F
          </div>
          <div className="description">{weather.weather[0].description}</div>
          <div className="icon">
            <img
              src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
