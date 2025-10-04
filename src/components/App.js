
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");     // for input value
  const [weather, setWeather] = useState(null); // for API response

  // your API key directly in this file
  const API_KEY = "086d9464daddd3ef42fa4f97bcac9b6f"; // ← replace with your actual key

  // function to handle Enter key press and fetch weather data
  const search = async (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: query,
              appid: API_KEY,
            },
          }
        );
        setWeather(response.data);
        setQuery(""); // clear input
      } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("City not found or invalid API key!");
      }
    }
  };

  // helper: convert Kelvin → Celsius
  const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);

  return (
    <div className="app">
      {/* Input box */}
      <input
        type="text"
        className="search"
        placeholder="Enter a city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />

      {/* Weather info */}
      {weather && (
        <div className="weather">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <h3>{kelvinToCelsius(weather.main.temp)}°C</h3>
          <p>{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
}

export default App;
