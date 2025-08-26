# 🌦️ Weather App — React + Node.js + MySQL

A **full-stack weather application** that allows users to search weather information for any city using the **OpenWeatherMap API**. All searches are logged in a **MySQL database**, and the app includes **search history management** (delete single/all entries). Features **Dark/Light mode**, **frontend-backend separation**, and duplicate consecutive entries prevention.

---

## 🚀 Features

- Search weather by city name  
- Fetches live data from **OpenWeatherMap API**  
- Displays temperature, humidity, wind, weather description, and country  
- Dark/Light mode toggle  
- **Search history stored in MySQL** and automatically updated in UI  
- Avoids duplicate consecutive entries in history  
- Delete single search or clear all history  
- Ready for **frontend-backend separation** with API endpoints  
- Environment variable support for API keys and DB credentials  

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), JavaScript, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MySQL  
- **API:** OpenWeatherMap API  
- **Other:** node-fetch, dotenv, cors, nodemon  

---

## 📂 Project Structure

WeatherApp/
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # SearchBox, WeatherCard, WeatherHistory
│ │ ├── App.jsx
│ │ └── index.jsx
│ ├── public/
│ └── package.json
│
├── backend/ # Node.js + Express backend
│ ├── controllers/ # weatherController.js
│ ├── models/ # Weather.js
│ ├── routes/ # weatherRoutes.js
│ ├── config/ # db.js
│ ├── .env # API key & DB credentials
│ ├── index.js
│ └── package.json
│
└── README.md # This file



---

## 📦 Installation & Setup

### Backend

1. Navigate to backend folder:

```bash
cd WeatherApp/backend


Install dependencies:

npm install


Create a .env file:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=weather_app
WEATHER_API_KEY=your_openweathermap_api_key


Run the server with auto-reload:

npm run dev


Backend API runs at: http://localhost:5000/api

Frontend

Navigate to frontend folder:

cd WeatherApp/frontend


Install dependencies:

npm install


Create a .env file:

VITE_WEATHER_API_KEY=your_openweathermap_api_key


Start the development server:

npm run dev


Frontend runs at: http://localhost:5173 (or as shown in console)

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/weather-api?city=	Fetch current weather from OpenWeather API
POST	/api/weather	Save searched weather in MySQL
GET	/api/weather	Retrieve search history from MySQL
DELETE	/api/weather/:id	Delete a single search record
DELETE	/api/weather	Delete all weather history
💾 Database Schema
CREATE TABLE weather_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(100),
    temperature FLOAT,
    description VARCHAR(255),
    country VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


Duplicate consecutive entries for the same city are automatically prevented in backend.