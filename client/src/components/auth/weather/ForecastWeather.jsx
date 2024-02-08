import React from "react";
import { getCustomWeatherIconUrl } from "./WeatherUtils";

const ForecastWeather = ({ forecastWeather, formatDate, roundTemperature }) => {

  if (!forecastWeather || !forecastWeather.list || forecastWeather.list.length === 0) {
    return null;
  }

  const noonWeather = forecastWeather.list
  .map((entry) => {
    const entryDateTime = new Date(entry.dt_txt);
    return entryDateTime.getHours() === 12 && entryDateTime.getMinutes() === 0
      ? {
          date: entryDateTime.toISOString(),
          mainTemp: entry.main.temp,
          description: entry.weather[0].description,
          icon: entry.weather[0].icon,
          feelsLike: entry.main.feels_like,
          id: entry.weather[0].id
        }
      : null;
  })
  .filter(Boolean)

  const customWeatherIconUrl = noonWeather.map(day => getCustomWeatherIconUrl(day.id));

    return (
        <div className="forecastWeatherCtn">
            <h2>Coming up this week</h2>
            <ul>
              {noonWeather.map((day, index) => (
                <li key={day.date} className="forecastDayCtn">
                  <div className="forecastTempInfo">
                    <p>{formatDate(day.date)}</p>
                    <p className="temp">{roundTemperature(day.mainTemp)}°C <span>/ {roundTemperature(day.feelsLike)}°C</span></p>
                  </div>
                  <div className="forecastImgCtn">
                    <img src={customWeatherIconUrl[index]} alt={day.description} />
                  </div>
                </li>
              ))}
            </ul>
        </div>
    );
};

export default ForecastWeather;