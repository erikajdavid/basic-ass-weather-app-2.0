import React from "react";
import { getCustomWeatherIconUrlForecast, formatForecastDate } from "./WeatherUtils";

const ForecastWeather = ({ forecastWeather, convertTemperature, unit }) => {

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

  const customWeatherIconUrl = noonWeather.map(day => getCustomWeatherIconUrlForecast(day.id));

    return (
        <div className="forecastWeatherCtn">
            <h2>Coming up this week</h2>
            <ul>
              {noonWeather.map((day, index) => (
                <li key={day.date} className="forecastDayCtn">
                  <div className="forecastTempInfo">
                    <p>{formatForecastDate(day.date)}</p>
                    <p className="temp">{convertTemperature(day.mainTemp)}{unit === 'metric' ? '°C' : '°F'}<span> / {convertTemperature(day.feelsLike)}{unit === 'metric' ? '°C' : '°F'}</span></p>
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