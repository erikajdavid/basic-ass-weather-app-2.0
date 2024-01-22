import React from "react";

const Weather = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  return (
    <>
      <h1>Weather Forecast for meeeee</h1>
      <p>{weatherData.name}</p>
      <p>Conditions: {weatherData.weather[0].main}</p>
      <p>Temp: {weatherData.main.temp}</p>
      <p>Feels like: {weatherData.main.feels_like}</p>
      <p>High: {weatherData.main.temp_max}</p>
      <p>Low: {weatherData.main.temp_min}</p>
    </>
  );
}

export default Weather;
