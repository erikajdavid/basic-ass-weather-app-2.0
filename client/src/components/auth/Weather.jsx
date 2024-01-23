import React from "react";

const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const month = dateObject.toLocaleString('en-US', { month: 'short' });
  const day = dateObject.getDate();
  return `${month} ${day}`;
};

const Weather = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  return (
    <div className="wrapper">
      <h1>{weatherData.city.name}</h1>
      <ul>{weatherData.list.map((list) => {
        return(
          <li key={list.dt}>
            <p>Date: {formatDate(list.dt_txt)}</p>
            <p>{list.main.temp}°C</p>
            <p>{list.weather[0].description}</p>
            <p>Feels like: {list.main.feels_like}°C</p>
            <p>H: {list.main.temp_max}°C</p>
            <p>L: {list.main.temp_min}°C</p>
            <p>Humidity: {list.main.humidity}%</p>
            <p>Pressure: {list.main.pressure}hPa</p>
            <p>Wind speed: {list.wind.speed}km/h</p>
          </li>
        )
      } )}</ul>
    </div>
  );
}

export default Weather;
