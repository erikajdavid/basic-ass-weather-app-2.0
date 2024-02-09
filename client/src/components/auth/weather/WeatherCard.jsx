import React from "react";
import DailyWeather from "./DailyWeather";
import ForecastWeather from "./ForecastWeather";
import { capitalize, roundTemperature } from "./WeatherUtils";

const WeatherCard = ({ dailyWeather, forecastWeather }) => {

  if (!dailyWeather || !forecastWeather) {
    return null;
  }

  return (
    <div className="weatherCardMainCtn">
      <div className="saveCity">
        <i class="fa-regular fa-heart"></i>
      </div>
      <div className="weatherCardCtn wrapper">  
        <DailyWeather 
          roundTemperature={roundTemperature} 
          dailyWeather={dailyWeather} 
          capitalize={capitalize}
        >  
        </DailyWeather>

        <ForecastWeather 
          roundTemperature={roundTemperature} 
          forecastWeather={forecastWeather} 
        >  
        </ForecastWeather>
      </div>
    </div>
  
  );
  
};

export default WeatherCard;
