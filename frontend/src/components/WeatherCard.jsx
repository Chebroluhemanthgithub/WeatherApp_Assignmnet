import React from 'react';

function WeatherCard({ weather }) {
  const getCountryFlag = (code) =>
    String.fromCodePoint(...[...code].map(c => 127397 + c.charCodeAt()));

  const getLocalTime = () => {
    if (!weather?.timezone) return "";
    const offset = new Date().getTimezoneOffset() * 60000;
    const cityTime = new Date(Date.now() + weather.timezone * 1000 + offset);
    return cityTime.toLocaleTimeString();
  };

  return (
    <div className="weather-card">
      <h2>
        📍 {weather.name}, {weather.sys.country} {getCountryFlag(weather.sys.country)}
      </h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
        className="weather-icon"
      />
      <p>🌡️ Temp: {weather.main.temp}°C</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>💨 Wind: {weather.wind.speed} m/s</p>
      <p>☁️ Condition: {weather.weather[0].description}</p>
      <p>🕒 Local Time: {getLocalTime()}</p>
    </div>
  );
}

export default WeatherCard;
