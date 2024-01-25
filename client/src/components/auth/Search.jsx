import React, { useState, useEffect } from "react";
import Weather from "./Weather";
const Search = () => {
    const [weatherData, setWeatherData] = useState("");
    const [city, setCity] = useState("");

    const myHeaders = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.token || ""}`
    }

    const searchWeather = async (e) => {
        e.preventDefault();

        try {
             const city = document.getElementById("cityInput").value;
 
             const response = await fetch(`http://localhost:3500/weather?city=${encodeURIComponent(city)}`, {
                 method: "GET",
                 headers: myHeaders
             });
 
             const parseResponse = await response.json();
 
             setWeatherData(parseResponse);
         
        } catch (error) {
         console.error(error.message);
        }
     };
 
     useEffect(() => {
         console.log(`Updated weatherData in useEffect:`, weatherData);
     }, [weatherData]);

     return (
        <>
          {weatherData ? (
            <Weather weatherData={weatherData} />
          ) : (
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
                  onClick={searchWeather}
                  className={!city ? "buttonDisabled" : "buttonEnabled"}>
                    {/* adding FA like this here because this icon isn't available in the FA library installed */}
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </form>
          )}
        </>
    );
}

export default Search;