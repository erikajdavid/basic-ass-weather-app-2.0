import React from "react";
import { format } from "date-fns";

const DailyWeather = ({ dailyWeather, roundTemperature, capitalize }) => {

    if( !dailyWeather || !dailyWeather.main || !dailyWeather.wind || !dailyWeather.name || !dailyWeather.weather) {
        return null;
    }

    const icon = dailyWeather.weather[0].icon;

    //date is not provided by API, so we are inserting it manually
    const today = new Date();
    const formatDate = format(today, 'EEEE, MMMM d, yyyy');

    const formatTime = (timestamp) => {
        const time = new Date(timestamp * 1000);
        const formattedTime = format(time, 'h:ss');
        return formattedTime;
    }

    const calculateDayLength = (sunriseTimestamp, sunsetTimestamp) => {
        const dayLengthInSeconds = sunsetTimestamp - sunriseTimestamp;
        const hours = Math.floor(dayLengthInSeconds / 3600);
        const minutes = Math.floor((dayLengthInSeconds % 3600) / 60);
        return `${hours}h ${minutes}min`;
      };

    return (
        <div className="dailyWeatherCtn">
            <div>
                <h2>Today</h2>
                <p>{formatDate}</p>
                <p>{roundTemperature(dailyWeather.main.temp)}°C</p>
                <p>H: {roundTemperature(dailyWeather.main.temp_max)}°C</p>
                <p>L: {roundTemperature(dailyWeather.main.temp_min)}°C</p>
                <p>Feels Like: {roundTemperature(dailyWeather.main.feels_like)}°C</p>
                <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={dailyWeather.weather[0].description}/>
                <p className="weatherDescription">{capitalize(dailyWeather.weather[0].description)}</p>
            </div>
            <div>
                <p>Sunrise: {formatTime(dailyWeather.sys.sunrise)} AM</p>
                <p>Sunset: {formatTime(dailyWeather.sys.sunset)} PM</p>
                <p>Day Length: {calculateDayLength(dailyWeather.sys.sunrise, dailyWeather.sys.sunset)}</p>
            </div>
            <div>
                <p>Humidity: {dailyWeather.main.humidity}%</p>
                <p>Pressure: {dailyWeather.main.pressure}hPa</p>
                <p>Wind speed: {dailyWeather.wind.speed}km/h</p>
            </div>
        </div>
    );

};

export default DailyWeather;