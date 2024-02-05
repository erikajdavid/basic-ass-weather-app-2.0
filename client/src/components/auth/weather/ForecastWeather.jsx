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
          icon: entry.weather[0].icon,
          feelsLike: entry.main.feels_like,
        }
      : null;
  })
  .filter(Boolean)

    
    return (
        <div className="forecastWeatherCtn">
            <h2>5-day forecast</h2>
            <ul>
            {noonWeather.map((day) => (
                <li key={day.date} className="forecastDayCtn">
                    <p>{formatDate(day.date)}</p>
                    <p className="mainTemp">{roundTemperature(day.mainTemp)}°C</p>
                    <p className="feelsLikeTemp">Feels Like: {roundTemperature(day.feelsLike)}°C</p>
                    {/* <p>{capitalize(day.description)}</p> */}
                    <img src={`http://openweathermap.org/img/w/${day.icon}.png`} alt={day.description}/>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default ForecastWeather;