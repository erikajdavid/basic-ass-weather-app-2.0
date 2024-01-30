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

const Weather = ({ dailyWeather, forecastWeather }) => {

  if (!dailyWeather || !forecastWeather) {
    return null;
  }

  return (
    <>  
      <DailyWeather roundTemperature={roundTemperature} dailyWeather={dailyWeather}></DailyWeather>
      <ForecastWeather formatDate={formatDate} roundTemperature={roundTemperature} forecastWeather={forecastWeather}></ForecastWeather>
    </>
  );
  
};

export default Weather;
