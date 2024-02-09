import React from "react";
import DailyWeather from "./DailyWeather";
import ForecastWeather from "./ForecastWeather";
import { format } from "date-fns";
import { capitalize } from "./WeatherUtils";
import { roundTemperature } from "./WeatherUtils";

//reformat date from api
const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const formattedDate = format(dateObject, 'eee, MMM d').toUpperCase();
  return formattedDate;
};

const WeatherCard = ({ dailyWeather, forecastWeather }) => {

  if (!dailyWeather || !forecastWeather) {
    return null;
  }

  return (
    <div className="weatherCardCtn wrapper">  
      <DailyWeather 
        roundTemperature={roundTemperature} 
        dailyWeather={dailyWeather} 
        capitalize={capitalize}
      >  
      </DailyWeather>

      <ForecastWeather 
        formatDate={formatDate} 
        roundTemperature={roundTemperature} 
        forecastWeather={forecastWeather} 
      >  
      </ForecastWeather>
    </div>
  );
  
};

export default WeatherCard;
