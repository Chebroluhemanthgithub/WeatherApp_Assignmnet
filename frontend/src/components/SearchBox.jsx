import React from "react";

function SearchBox({ city, setCity, handleSearch }) {
  return (
    <form onSubmit={handleSearch} className="input-group">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button className="search-btn" type="submit">Search</button>
    </form>
  );
}

export default SearchBox;
