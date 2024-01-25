import React, { useState } from "react";

const Search = ({ handleSearch }) => {
  
  const [city, setCity] = useState("");

  const handleSearchClick = (e) => {
    e.preventDefault();

    handleSearch(city);

    //clear search
    setCity("");
  }

  return (
    <form className="searchForm">
      <div className="searchWrapper">
        <input type="text" 
          id="cityInput" 
          placeholder="Enter a city..." 
          value={city}
          onChange={(e => setCity(e.target.value))}
          required></input>
        <button 
          type="submit" 
          onClick={handleSearchClick}
          className={!city ? "buttonDisabled" : "buttonEnabled"}>
            {/* adding FA like this here because this icon isn't available in the FA library installed */}
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </form>
  );
}

export default Search;