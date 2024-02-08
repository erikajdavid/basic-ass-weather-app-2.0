import React from "react";
import { format } from "date-fns";
import { getCustomWeatherIconUrl } from "./WeatherUtils";

const DailyWeather = ({ dailyWeather, roundTemperature, capitalize }) => {

    if( !dailyWeather || !dailyWeather.main || !dailyWeather.wind || !dailyWeather.name || !dailyWeather.weather) {
        return null;
    }

    const { id } = dailyWeather.weather[0];

    const today = new Date();
    const formatDate = format(today, "EEE, MMM d").toUpperCase();

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

    const customWeatherIconUrl = getCustomWeatherIconUrl(id);

    return (
        <div className="dailyWeatherCtn">
            <div className="ctn1">
                <div className="dailyMainInfo">
                    <div class="mainWeatherText">
                        <div className="location">
                            <i class="fa-solid fa-location-dot"></i>
                            <h2>{dailyWeather.name}</h2>
                        </div>
                        <h3>Today</h3>
                        <p className="date">{formatDate}</p>
                        <div className="temps">
                            <p className="mainTemp">{roundTemperature(dailyWeather.main.temp)}°C</p>
                        </div>
                        <p className="feelsLikeTemp">Feels Like: {roundTemperature(dailyWeather.main.feels_like)}°C</p>
                        <div className="HLtemp">
                            <p>High: {roundTemperature(dailyWeather.main.temp_max)}°C</p>
                            <p>Low: {roundTemperature(dailyWeather.main.temp_min)}°C</p>
                        </div>
                    </div>
                    <div className="imgMainCtn">
                        <div className="imgCtn">
                            <img src={customWeatherIconUrl} alt={dailyWeather.weather[0].description}/>
                        </div>
                        <p className="weatherDescription">{capitalize(dailyWeather.weather[0].description)}</p>
                    </div>
                </div>
                <div className="ctn2">
                    <div class="extraInfoCtn">
                        <p className="extraInfoType">Humidity</p> 
                        <div className="extraInfoImgCtn">
                            <img src="./assets/humidity.png" alt=""></img>
                        </div>
                        <p>{dailyWeather.main.humidity}%</p>
                    </div>
                    <div class="extraInfoCtn">
                        <p className="extraInfoType">Pressure</p> 
                        <div className="extraInfoImgCtn">
                            <img src="./assets/pressure.png" alt=""></img>
                        </div>
                        <p>{dailyWeather.main.pressure}hPa</p>
                    </div>
                    <div class="extraInfoCtn">
                        <p className="extraInfoType">Wind speed</p> 
                        <div className="extraInfoImgCtn">
                            <img src="./assets/wind.png" alt=""></img>
                        </div>
                        <p>{dailyWeather.wind.speed}km/h</p>
                    </div>
                </div>  
            </div>
            <div className="ctn3">
                    <div className="sunInfoCtn">
                        <div className="sunImgCtn">
                            <img src="./assets/sunrise.png" alt=""/>
                        </div>
                        <p>{formatTime(dailyWeather.sys.sunrise)} AM</p>
                    </div>
                    <div className="sunInfoCtn">
                        <div className="sunImgCtn">
                            <img src="./assets/sunset.png" alt=""/>
                        </div>
                        <p>{formatTime(dailyWeather.sys.sunset)} PM</p>
                    </div>
                    <div className="sunInfoCtn">
                        <div className="sunImgCtn dayLengthCtn">
                            <img src="./assets/light.png" alt=""/>
                        </div>
                        <p className="dayLength"><span className="lightText">Hours of light:</span> {calculateDayLength(dailyWeather.sys.sunrise, dailyWeather.sys.sunset)}</p>
                    </div>
                </div>
        </div>
    );

};

export default DailyWeather;