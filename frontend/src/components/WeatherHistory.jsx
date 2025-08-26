import React, { useEffect, useState } from "react";

function WeatherHistory({ refresh }) {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/weather");
      const data = await res.json();
      // Remove duplicates by ID just in case
      const uniqueData = [...new Map(data.map(item => [item.id, item])).values()];
      setHistory(uniqueData);
    } catch (err) {
      console.error("Fetch history error:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/weather/${id}`, { method: "DELETE" });
      const data = await res.json();
      console.log(data.message);
      fetchHistory();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleClearAll = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/weather", { method: "DELETE" });
      const data = await res.json();
      console.log(data.message);
      fetchHistory();
    } catch (err) {
      console.error("Clear all error:", err);
    }
  };

  return (
    <div className="history">
      <h2>📊 Search History</h2>
      <button onClick={handleClearAll}>Clear All History</button>
      <ul>
        {history.map(item => (
          <li key={item.id}>
            {item.city} ({item.country}) - 🌡️ {item.temperature}°C, {item.description}{" "}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherHistory;
