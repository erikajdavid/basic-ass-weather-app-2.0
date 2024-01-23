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
            <p>{list.main.temp}</p>
          </li>
        )
      } )}</ul>
    </div>
  );
}

export default Weather;
