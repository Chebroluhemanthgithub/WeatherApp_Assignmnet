import fetch from "node-fetch";
import db from "../config/db.js";
import { insertWeather, getWeatherData } from "../models/Weather.js";

// Fetch weather from OpenWeather API and save to DB
export const getWeatherFromAPI = async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) return res.status(data.cod).json({ error: data.message });

    insertWeather(
      {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        country: data.sys.country,
      },
      (err) => {
        if (err) console.error("DB Insert Error:", err);
      }
    );

    res.json(data);
  } catch (err) {
    console.error("❌ API Fetch Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Save weather data from frontend
export const saveWeather = (req, res) => {
  const { city, temperature, description, country } = req.body;
  if (!city || !temperature || !description || !country)
    return res.status(400).json({ error: "Missing required fields" });

  insertWeather({ city, temperature, description, country }, (err) => {
    if (err) return res.status(500).json({ error: "DB Insert Error" });
    res.json({ message: "✅ Weather data saved successfully!" });
  });
};

// Fetch all weather history
export const fetchWeatherData = (req, res) => {
  getWeatherData((err, results) => {
    if (err) return res.status(500).json({ error: "DB Fetch Error" });
    res.json(results);
  });
};

// Delete a single weather record by ID
export const deleteWeather = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM weather_data WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "DB Delete Error" });
    res.json({ message: "✅ Weather search deleted successfully!" });
  });
};

// Delete all weather history
export const clearAllWeather = (req, res) => {
  db.query("DELETE FROM weather_data", (err, result) => {
    if (err) return res.status(500).json({ error: "DB Delete Error" });
    res.json({ message: "✅ All weather history cleared!" });
  });
};
