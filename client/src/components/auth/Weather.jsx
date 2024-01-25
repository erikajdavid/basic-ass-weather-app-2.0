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

  // const currentHours = new Date().getHours();

  // Find the forecast entry with the closest time to the current time for the current day
  // const todaysWeather = weatherData.list
  //   .filter((entry) => {
  //     // Filter entries for today
  //     const entryDate = new Date(entry.dt_txt).toLocaleDateString();
  //     const currentDate = new Date().toLocaleDateString();
  //     return entryDate === currentDate;
  //   })
  //   .reduce((closest, entry) => {
  //     const forecastTime = new Date(entry.dt_txt).getHours();
  //     const currentDiff = Math.abs(forecastTime - currentHours);
  //     const closestDiff = Math.abs(new Date(closest.dt_txt).getHours() - currentHours);

  //     // If this entry is closer to the current time, update the closestWeather
  //     if (currentDiff < closestDiff) {
  //       return entry;
  //     }

  //     return closest;
  //   }, weatherData.list.find((entry) => {
  //     // Fallback to the first entry if no matching time is found
  //     return new Date(entry.dt_txt).toLocaleDateString() === new Date().toLocaleDateString();
  //   }));

  // Filter the forecast entries for the other four days at 12:00 pm
  const forecast = weatherData.list.filter((entry) => {
    const forecastTime = new Date(entry.dt_txt).getHours();
    return forecastTime === 12;
  });

  return (
    <div className="wrapper">
      <h1>{weatherData.city.name}</h1>
      <ul>
        {/* {todaysWeather && (
          <li key={todaysWeather.dt}>
            <p>Date: {formatDate(todaysWeather.dt_txt)}</p>
            <p>Main Temp: {roundTemperature(todaysWeather.main.temp)}°C</p>
            <p>Description: {todaysWeather.weather[0].description}</p>
            <p>Feels Like: {roundTemperature(todaysWeather.main.feels_like)}°C</p>
            <p>High: {roundTemperature(todaysWeather.main.temp_max)}°C</p>
            <p>Low: {roundTemperature(todaysWeather.main.temp_min)}°C</p>
            <p>Humidity: {todaysWeather.main.humidity}%</p>
            <p>Pressure: {todaysWeather.main.pressure}hPa</p>
            <p>Wind Speed: {todaysWeather.wind.speed}km/h</p>
          </li>
        )} */}

        {forecast.map((entry) => (
          <li key={entry.dt}>
            <p>Date: {formatDate(entry.dt_txt)}</p>
            <p>Main Temp: {roundTemperature(entry.main.temp)}°C</p>
            <p>Description: {entry.weather[0].description}</p>
            <p>Feels Like: {roundTemperature(entry.main.feels_like)}°C</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Weather;
