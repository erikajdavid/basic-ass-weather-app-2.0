import React from "react";
import DailyWeather from "./DailyWeather";
import ForecastWeather from "./ForecastWeather";
import { capitalize, roundTemperature } from "./WeatherUtils";
import SaveCity from "../SaveCity";

const WeatherCard = ({ dailyWeather, forecastWeather, handleToggleUnit, unit }) => {

  if (!dailyWeather || !forecastWeather) {
    return null;
  }

  return (
    <div className="weatherCardMainCtn">
      <SaveCity />
      <div className="weatherCardCtn wrapper">  
        <DailyWeather 
          roundTemperature={roundTemperature} 
          dailyWeather={dailyWeather} 
          capitalize={capitalize}
          handleToggleUnit={handleToggleUnit}
          unit={unit} 
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
