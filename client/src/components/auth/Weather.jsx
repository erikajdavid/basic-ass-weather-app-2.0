import React from "react";

const Weather = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  return (
    <div className="wrapper">
      <h1>{weatherData.name}</h1>
      <p>Conditions: {weatherData.weather[0].main}</p>
      <p>Temp: {weatherData.main.temp}°C</p>
      <p>Feels like: {weatherData.main.feels_like}°C</p>
      <p>High: {weatherData.main.temp_max}°C</p>
      <p>Low: {weatherData.main.temp_min}°C</p>
    </div>
  );
}

export default Weather;
