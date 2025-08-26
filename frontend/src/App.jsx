import React, { useState } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import WeatherHistory from "./components/WeatherHistory";
import "./App.css";

function App() {
  const [city, setCity] = useState(() => localStorage.getItem("lastCity") || "Hyderabad");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [refreshHistory, setRefreshHistory] = useState(false); // Trigger WeatherHistory refresh

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setWeather(null);

    try {
      const res = await fetch(`http://localhost:5000/api/weather-api?city=${cityName}`);
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
        localStorage.setItem("lastCity", cityName);

        // Save to backend DB
        await fetch("http://localhost:5000/api/weather", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            country: data.sys.country,
          }),
        });

        setRefreshHistory(prev => !prev); // Refresh WeatherHistory
      } else {
        setWeather(null);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault(); // Only if called from a form
    const trimmedCity = city.trim();
    if (trimmedCity) {
      fetchWeather(trimmedCity);
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <h1>🌦️ Weather App</h1>

      <button className="toggle-btn" onClick={() => setDarkMode(prev => !prev)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <SearchBox city={city} setCity={setCity} handleSearch={handleSearch} />

      {loading ? (
        <h3>Loading...</h3>
      ) : weather ? (
        <WeatherCard weather={weather} />
      ) : (
        <p className="error-msg">City not found. Try again!</p>
      )}

      <WeatherHistory refresh={refreshHistory} />
    </div>
  );
}

export default App;
