import React from "react";

const Weather = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  return (
    <div className="wrapper">
      <h1>{weatherData.city.name}</h1>
      <ul>{weatherData.list.slice(0, 5).map((list) => {
        return(
          <li>
            <p>Date: {list.dt_txt}</p>
            <p>{list.main.temp}°C</p>
            <p>Feels like: {list.main.feels_like}°C</p>
            <p>H: {list.main.temp_max}°C</p>
            <p>L: {list.main.temp_min}°C</p>
            <p>Humidity: {list.main.humidity}%</p>
            <p>Pressure: {list.main.pressure}hPa</p>
          </li>
        )
      } )}</ul>
    </div>
  );
}

export default Weather;
