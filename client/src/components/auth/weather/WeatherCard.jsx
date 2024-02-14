import React, { useState } from "react";
import DailyWeather from "./DailyWeather";
import ForecastWeather from "./ForecastWeather";
import { capitalize, roundTemperature } from "./WeatherUtils";
import SaveCity from "../SaveCity";
import TempToggle from "../TempToggle";

const WeatherCard = ({ dailyWeather, forecastWeather, cityName }) => {

  const [unit, setUnit] = useState("metric");

  if (!dailyWeather || !forecastWeather) {
    return null;
  }

  const handleToggleUnit = () => {
    // Toggle between Celsius and Fahrenheit
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };  

  const convertTemperature = (temperature) => {
    if (unit === 'metric') {
        return roundTemperature(temperature);
    } else {
        // Convert Celsius to Fahrenheit
        return roundTemperature((temperature * 9/5) + 32);
    }
  };

  return (
    <div className="weatherCardMainCtn">
        <SaveCity cityName={cityName} /> 
      <div className="weatherCardCtn wrapper">  
        <TempToggle handleToggleUnit={handleToggleUnit} unit={unit}/>
        <DailyWeather 
          roundTemperature={roundTemperature} 
          dailyWeather={dailyWeather} 
          capitalize={capitalize}
          unit={unit}
          convertTemperature={convertTemperature}
        >  
        </DailyWeather>

        <ForecastWeather 
          roundTemperature={roundTemperature} 
          forecastWeather={forecastWeather} 
          unit={unit}
          convertTemperature={convertTemperature}
        >  
        </ForecastWeather>
      </div>
    </div>
  
  );
  
};

export default WeatherCard;
