import React from "react";

const ForecastWeather = ({ forecastWeather, formatDate, roundTemperature, capitalize }) => {

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
          feelsLike: entry.main.feels_like,
          humidity: entry.main.humidity,
          pressure: entry.main.pressure,
          windSpeed: entry.wind.speed,
        }
      : null;
  })
  .filter(Boolean)
    
    return (
        <div className="wrapper forecastCtn">
            <h2>Forecast</h2>
            <ul>
            {noonWeather.map((day) => (
                <li key={day.date}>
                    <p>{formatDate(day.date)}</p>
                    <p>{roundTemperature(day.mainTemp)}°C</p>
                    <p>{capitalize(day.description)}</p>
                    <p>Feels Like: {roundTemperature(day.feelsLike)}°C</p>
                    <p>Humidity: {day.humidity}%</p>
                    <p>Pressure: {day.pressure}hPa</p>
                    <p>Wind Speed: {day.windSpeed}km/h</p>
                </li>
            ))}
            </ul>
        </div>
    );

};

export default ForecastWeather;