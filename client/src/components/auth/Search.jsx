import React, { useState, useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";

const Search = ({ handleSearch, loading }) => {
  
  const [city, setCity] = useState("");
  const cityInputRef = useRef(null);

  const handleSearchClick = (e) => {
    e.preventDefault();

    handleSearch(city);

    //clear search
    setCity("");

    //remove focus from input field
    // document.getElementById('cityInput').blur();
    if (cityInputRef.current) {
      cityInputRef.current.blur();
    }
  }

  return (
    <form onSubmit={handleSearchClick} className="searchWrapper">
      <input type="text" 
        id="cityInput" 
        placeholder="Enter a city..." 
        value={city}
        onChange={(e => setCity(e.target.value))}
        required
        autoComplete="off"
        ref={cityInputRef}
      />
      <button 
        type="submit" 
        className={!city ? "buttonDisabled" : "buttonEnabled"}>
          {/* adding FA like this here because this icon isn't available in the FA library installed */}
        {loading ? <LoadingSpinner /> : <i className="fa-solid fa-magnifying-glass"></i>}
      </button>
    </form>
  );

};

export default Search;