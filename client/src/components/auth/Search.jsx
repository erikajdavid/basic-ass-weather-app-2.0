import React, { useState, useRef } from "react";

const Search = ({ handleSearch }) => {
  
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
    <form className="searchWrapper">
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
        onClick={handleSearchClick}
        className={!city ? "buttonDisabled" : "buttonEnabled"}>
          {/* adding FA like this here because this icon isn't available in the FA library installed */}
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );

};

export default Search;