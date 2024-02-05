import React from "react";
import DailyWeather from "./DailyWeather";
import ForecastWeather from "./ForecastWeather";
import { format } from "date-fns";

//reformat date from api
const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const formattedDate = format(dateObject, 'eeee, MMMM, d');
  return formattedDate;
};

//round temp to the nearest degree
const roundTemperature = (temperature) => {
  return Math.round(temperature);
};

//capitalize first letter in description returned from API
const capitalize = (str) => {
  if (str && typeof str === 'string') {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else {
    // Return the original string if it's empty or not a string
    return str;
  }
}

const WeatherCard = ({ dailyWeather, forecastWeather }) => {

  if (!dailyWeather || !forecastWeather) {
    return null;
  }

  console.log(dailyWeather);

  return (
    <div className="weatherCardCtn">  
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
        capitalize={capitalize}
      >  
      </ForecastWeather>
    </div>
  );
  
};

export default WeatherCard;
