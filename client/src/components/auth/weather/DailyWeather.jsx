import React from "react";
import { format } from "date-fns";

const DailyWeather = ({ dailyWeather, roundTemperature }) => {

    //date is not provided by API, so we are inserting it manually
    const today = new Date();
    const formatDate = format(today, 'EEEE, MMMM d, yyyy');

    return (
        <div className="wrapper">
            <h1>{dailyWeather.name}</h1>
            <div>
                <h2>Daily Forecast:</h2>
                <p>{formatDate}</p>
                <p>Temp: {roundTemperature(dailyWeather.main.temp)}°C</p>
                <p>Description: {dailyWeather.weather[0].description}</p>
                <p>Feels Like: {roundTemperature(dailyWeather.main.feels_like)}°C</p>
                <p>H: {roundTemperature(dailyWeather.main.temp_max)}°C</p>
                <p>L: {roundTemperature(dailyWeather.main.temp_min)}°C</p>
                <p>Humidity: {dailyWeather.main.humidity}%</p>
                <p>Pressure: {dailyWeather.main.pressure}hPa</p>
                <p>Wind Speed: {dailyWeather.wind.speed}km/h</p>
            </div>
        </div>
    );

};

export default DailyWeather;