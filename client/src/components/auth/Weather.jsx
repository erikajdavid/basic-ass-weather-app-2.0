import React from "react";

//reformat date from api
const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const month = dateObject.toLocaleString('en-US', { month: 'short' });
  const day = dateObject.getDate();
  return `${month} ${day}`;
};

//round temp to the nearest degree
const roundTemperature = (temperature) => {
  return Math.round(temperature);
};

const Weather = ({ dailyWeather, forecastWeather }) => {

  if (!dailyWeather || !forecastWeather) {
    return null;
  }

  return (
    <div className="wrapper">
      <h1>{dailyWeather.name}</h1>
      <div>
        <h2>Daily Forecast:</h2>
        <p>Temp: {roundTemperature(dailyWeather.main.temp)}°C</p>
        <p>Description: {dailyWeather.weather.description}</p>
        <p>Feels Like: {roundTemperature(dailyWeather.main.feels_like)}°C</p>
        <p>H: {roundTemperature(dailyWeather.main.temp_max)}°C</p>
        <p>L: {roundTemperature(dailyWeather.main.temp_min)}°C</p>
        <p>Humidity: {dailyWeather.main.humidity}%</p>
        <p>Pressure: {dailyWeather.main.pressure}hPa</p>
        <p>Wind Speed: {dailyWeather.wind.speed}km/h</p>
      </div>
      <div>
        <h2>Next 4-day Forecast</h2>
        <ul>
        {forecastWeather.list.map((day) => (
            <li key={day.dt}>
              <p>Date: {formatDate(day.dt_txt)}</p>
              <p>Main Temp: {roundTemperature(day.main.temp)}°C</p>
              <p>Description: {day.weather[0].description}</p>
              <p>Feels Like: {roundTemperature(day.main.feels_like)}°C</p>
              <p>H: {roundTemperature(day.main.temp_max)}°C</p>
              <p>L: {roundTemperature(day.main.temp_min)}°C</p>
              <p>Humidity: {day.main.humidity}%</p>
              <p>Pressure: {day.main.pressure}hPa</p>
              <p>Wind Speed: {day.wind.speed}km/h</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Weather;
