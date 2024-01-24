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

  //find the forecast entry with the closest time to the current time for the current day
  const todaysWeather = weatherData.list
    .filter((entry) => {
      //filter entries for today
      const entryDate = new Date(entry.dt_txt).toLocaleDateString();
      const currentDate = new Date().toLocaleDateString();
      return entryDate === currentDate;
    })
    .reduce((closest, entry) => {
      const forecastTime = new Date(entry.dt_txt).getHours();
      const currentDiff = Math.abs(forecastTime - currentHours);
      const closestDiff = Math.abs(new Date(closest.dt_txt).getHours() - currentHours);

      //if this entry is closer to the current time, update the closestWeather
      if (currentDiff < closestDiff) {
        return entry;
      }

      return closest;
    }, weatherData.list.find((entry) => {
      //fallback to the first entry if no matching time is found
      return new Date(entry.dt_txt).toLocaleDateString() === new Date().toLocaleDateString();
    }));

  //filter the forecast entries for the other four days at 12:00 pm
  const forecast = weatherData.list.filter((entry) => {
    const forecastTime = new Date(entry.dt_txt).getHours();
    return forecastTime === 12;
  });

  return (
    <div className="wrapper">
      <h1>{weatherData.city.name}</h1>
      <ul>
        {todaysWeather && (
          <li key={todaysWeather.dt}>
            <p>Date: {formatDate(todaysWeather.dt_txt)}</p>
            <p>{todaysWeather.main.temp}°C</p>
            <p>{todaysWeather.weather[0].description}</p>
            <p>Feels like: {todaysWeather.main.feels_like}°C</p>
            <p>H: {todaysWeather.main.temp_max}°C</p>
            <p>L: {todaysWeather.main.temp_min}°C</p>
            <p>Humidity: {todaysWeather.main.humidity}%</p>
            <p>Pressure: {todaysWeather.main.pressure}hPa</p>
            <p>Wind speed: {todaysWeather.wind.speed}km/h</p>
          </li>
        )}

          {forecast.map((entry) => (
            <li key={entry.dt}>
              <p>Date: {formatDate(entry.dt_txt)}</p>
              <p>{entry.main.temp}°C</p>
              <p>{entry.weather[0].description}</p>
              <p>Feels like: {entry.main.feels_like}°C</p>
              <p>H: {entry.main.temp_max}°C</p>
              <p>L: {entry.main.temp_min}°C</p>
              <p>Humidity: {entry.main.humidity}%</p>
              <p>Pressure: {entry.main.pressure}hPa</p>
              <p>Wind speed: {entry.wind.speed}km/h</p>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default Weather;
