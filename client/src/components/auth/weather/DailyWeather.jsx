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

    return (
        <div className="dailyWeatherCtn">
            <div className="lightBlueCtn">
                <h2>Today</h2>
                <p>{formatDate}</p>
                <div className="temps">
                    <p className="mainTemp">{roundTemperature(dailyWeather.main.temp)}°C</p>
                    <div className="HLtemps">
                        <p>H: {roundTemperature(dailyWeather.main.temp_max)}°C</p>
                        <p>L: {roundTemperature(dailyWeather.main.temp_min)}°C</p>
                    </div>
                </div>
                <p>Feels Like: {roundTemperature(dailyWeather.main.feels_like)}°C</p>
                <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={dailyWeather.weather[0].description}/>
            </div>
            <div className="darkBlueCtn">
                <p>{capitalize(dailyWeather.weather[0].description)}</p>
                <div class="weatherExtrasMainCtn">
                    <div className="weatherExtrasCtn">
                        <p>Humidity:</p>
                        <div className="extraIconCtn">
                            <img src="./assets/humidity.png"></img>
                        </div>
                        <p>{dailyWeather.main.humidity}%</p>
                    </div>
                    <div className="weatherExtrasCtn">
                        <p>Pressure:</p>
                        <div className="extraIconCtn">
                            <img src="./assets/pressure.png"></img>
                        </div>
                        <p>{dailyWeather.main.pressure}hPa</p>
                    </div>
                    <div className="weatherExtrasCtn">
                        <p>Wind speed:</p>
                        <div className="extraIconCtn">
                            <img src="./assets/wind.png"></img>
                        </div>
                        <p>{dailyWeather.wind.speed}km/h</p>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default DailyWeather;