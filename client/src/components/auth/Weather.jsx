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

const Weather = ({ weatherData }) => {

  if (!weatherData) {
    return null;
  }

  return (
    <div className="wrapper">
      <h1>{weatherData.city.name}</h1>
      <ul>
        {weatherData.list.map((day) => (
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
  );
};

export default Weather;
