import db from "../config/db.js";

// Insert weather, avoiding duplicate consecutive entries
export const insertWeather = (weatherData, callback) => {
  const { city, temperature, description, country } = weatherData;

  db.query(
    "SELECT * FROM weather_data WHERE city = ? ORDER BY created_at DESC LIMIT 1",
    [city],
    (err, results) => {
      if (err) return callback(err);

      if (results.length && results[0].temperature === temperature && results[0].description === description) {
        // Skip insert if same data already exists
        return callback(null);
      }

      db.query(
        "INSERT INTO weather_data (city, temperature, description, country) VALUES (?, ?, ?, ?)",
        [city, temperature, description, country],
        callback
      );
    }
  );
};

// ✅ Add this export too
export const getWeatherData = (callback) => {
  db.query("SELECT * FROM weather_data ORDER BY created_at DESC", callback);
};
