import React from "react";

const ForecastWeather = ({ forecastWeather, formatDate, roundTemperature }) => {

    const noonWeather = forecastWeather.list
    .map((entry) => {
      const entryDateTime = new Date(entry.dt_txt);
      return entryDateTime.getHours() === 12 && entryDateTime.getMinutes() === 0
        ? {
            date: entryDateTime.toISOString(),
            mainTemp: entry.main.temp,
            description: entry.weather[0].description,
            feelsLike: entry.main.feels_like,
            humidity: entry.main.humidity,
            pressure: entry.main.pressure,
            windSpeed: entry.windSpeed,
          }
        : null;
    })
    .filter(Boolean)

  console.log(noonWeather);
    
    return (
        <div className="wrapper">
            <h2>Next 4-day Forecast</h2>
            <ul>
            {noonWeather.map((day) => (
                <li key={day.date}>
                <p>Date: {formatDate(day.date)}</p>
                <p>Main Temp: {roundTemperature(day.mainTemp)}°C</p>
                <p>Description: {day.description}</p>
                <p>Feels Like: {roundTemperature(day.feelsLike)}°C</p>
                <p>Humidity: {day.humidity}%</p>
                <p>Pressure: {day.pressure}hPa</p>
                <p>Wind Speed: {day.speed}km/h</p>
                </li>
            ))}
            </ul>
        </div>
    );

};

export default ForecastWeather;