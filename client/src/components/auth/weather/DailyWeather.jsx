import React from "react";

const DailyWeather = ({ dailyWeather, roundTemperature }) => {

    return (

        <>
            <div className="wrapper">
                <h1>{dailyWeather.name}</h1>
                <div>
                    <h2>Daily Forecast:</h2>
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
        </>
    );

}

export default DailyWeather;