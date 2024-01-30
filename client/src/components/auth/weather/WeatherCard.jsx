import React from "react";
import DailyWeather from "./DailyWeather";
import ForecastWeather from "./ForecastWeather";

//reformat date from api
const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const month = dateObject.toLocaleString('en-US', { month: 'short' });
  const day = dateObject.getDate();
  return `${month} ${day}`;
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
      <DailyWeather formatDate={formatDate} roundTemperature={roundTemperature} dailyWeather={dailyWeather}></DailyWeather>
      <ForecastWeather formatDate={formatDate} roundTemperature={roundTemperature} forecastWeather={forecastWeather}></ForecastWeather>
    </>
  );
  
};

export default Weather;