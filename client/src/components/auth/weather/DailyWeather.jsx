import React from "react";
import { format } from "date-fns";

const DailyWeather = ({ dailyWeather, roundTemperature, capitalize, formatDate }) => {

    if( !dailyWeather || !dailyWeather.main || !dailyWeather.wind || !dailyWeather.name || !dailyWeather.weather) {
        return null;
    }

    const icon = dailyWeather.weather[0].icon;

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
            <div className="ctn1">
                <div className="dailyMainInfo">
                    <div class="mainWeatherText">
                        <div className="location">
                            <i class="fa-solid fa-location-dot"></i>
                            <h2>{dailyWeather.name}</h2>
                        </div>
                        <h3>Today</h3>
                        <p className="date">{formatDate(dailyWeather.dt)}</p>
                        <div className="temps">
                            <p className="mainTemp">{roundTemperature(dailyWeather.main.temp)}°C</p>
                        </div>
                        <p className="feelsLikeTemp">Feels Like: {roundTemperature(dailyWeather.main.feels_like)}°C</p>
                        <div className="HLtemp">
                                <p>High: {roundTemperature(dailyWeather.main.temp_max)}°C</p>
                                <p>Low: {roundTemperature(dailyWeather.main.temp_min)}°C</p>
                        </div>
                    </div>
                    <div className="hi">
                        <div className="imgCtn">
                            <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={dailyWeather.weather[0].description}/>
                        </div>
                        <p className="weatherDescription">{capitalize(dailyWeather.weather[0].description)}</p>
                    </div>
                </div>
                <div className="ctn2">
                    <div class="extraInfoCtn">
                        <p>Humidity</p> 
                        <div className="extraInfoImgCtn">
                            <img src="./assets/humidity.png" alt=""></img>
                        </div>
                        <p>{dailyWeather.main.humidity}%</p>
                    </div>
                    <div class="extraInfoCtn">
                        <p>Pressure</p> 
                        <div className="extraInfoImgCtn">
                            <img src="./assets/pressure.png" alt=""></img>
                        </div>
                        <p>{dailyWeather.main.pressure}hPa</p>
                    </div>
                    <div class="extraInfoCtn">
                        <p>Wind speed</p> 
                        <div className="extraInfoImgCtn">
                            <img src="./assets/wind.png" alt=""></img>
                        </div>
                        <p>{dailyWeather.wind.speed}km/h</p>
                    </div>
                </div>  
            </div>
            <div className="ctn3">
                    <div className="sunInfoCtn">
                        <p>Sunrise</p>
                        <i class="fa-regular fa-sun"></i>
                        <p>{formatTime(dailyWeather.sys.sunrise)} AM</p>
                    </div>
                    <div className="sunInfoCtn">
                        <p>Sunset</p>
                        <i class="fa-regular fa-moon"></i>
                        <p>{formatTime(dailyWeather.sys.sunset)} PM</p>
                    </div>
                    <div className="sunInfoCtn">
                        <p>Day Length: {calculateDayLength(dailyWeather.sys.sunrise, dailyWeather.sys.sunset)}</p>
                    </div>
                </div>
        </div>
    );

};

export default DailyWeather;