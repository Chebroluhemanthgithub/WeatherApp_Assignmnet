import express from "express";
import { 
  getWeatherFromAPI, 
  saveWeather, 
  fetchWeatherData, 
  deleteWeather, 
  clearAllWeather 
} from "../controllers/weatherController.js";

const router = express.Router();

// Fetch live weather from API
router.get("/weather-api", getWeatherFromAPI);

// Save weather to DB
router.post("/weather", saveWeather);

// Fetch all weather history
router.get("/weather", fetchWeatherData);

// Delete a single search by ID
router.delete("/weather/:id", deleteWeather);

// Delete all weather history
router.delete("/weather", clearAllWeather);

export default router;
