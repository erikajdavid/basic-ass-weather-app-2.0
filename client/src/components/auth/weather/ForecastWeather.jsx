import React from "react";

const ForecastWeather = ({ forecastWeather, formatDate, roundTemperature }) => {

    return (
        <div className="wrapper">
            <h2>Next 4-day Forecast</h2>
            <ul>
            {forecastWeather.list.map((day) => (
                <li key={day.dt}>
                <p>Date: {formatDate(day.dt_txt)}</p>
                <p>Main Temp: {roundTemperature(day.main.temp)}°C</p>
                <p>Description: {day.weather[0].description}</p>
                <p>Feels Like: {roundTemperature(day.main.feels_like)}°C</p>
                <p>H: {roundTemperature(day.main.temp_max)}°C</p>
                <p>L: {roundTemperature(day.main.temp_min)}°C</p>
                <p>Humidity: {day.main.humidity}%</p>
                <p>Pressure: {day.main.pressure}hPa</p>
                <p>Wind Speed: {day.wind.speed}km/h</p>
                </li>
            ))}
            </ul>
        </div>
    );

};

export default ForecastWeather;