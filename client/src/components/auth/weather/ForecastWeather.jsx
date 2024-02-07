import React from "react";

const ForecastWeather = ({ forecastWeather, formatDate, roundTemperature, capitalize }) => {

  if (!forecastWeather || !forecastWeather.list || forecastWeather.list.length === 0) {
    return null;
  }

  console.log(forecastWeather);

  const noonWeather = forecastWeather.list
  .map((entry) => {
    const entryDateTime = new Date(entry.dt_txt);
    return entryDateTime.getHours() === 12 && entryDateTime.getMinutes() === 0
      ? {
          date: entryDateTime.toISOString(),
          mainTemp: entry.main.temp,
          description: entry.weather[0].description,
          icon: entry.weather[0].icon,
          feelsLike: entry.main.feels_like,
          id: entry.weather[0].id
        }
      : null;
  })
  .filter(Boolean)

  console.log(noonWeather)

  const getCustomWeatherIconUrl = (id) => {
    if (id >= 200 && id < 300) {
        return "./assets/11d.png";
    } else if (id >= 300 && id < 400 || id >= 500 && id < 600) {
        return "./assets/09d.png";
    } else if (id >= 600 && id < 700) {
        return "./assets/13d.png";
    } else if (id >= 700 && id < 800) {
        return "./assets/50d.png"
    } else if (id === 800) {
        return "./assets/01d.png"
    } else if (id >= 801 && id < 900) {
        return "./assets/03d.png"
    }
  }

const customWeatherIconUrl = noonWeather.map(day => getCustomWeatherIconUrl(day.id));
console.log(customWeatherIconUrl);    

    return (
        <div className="forecastWeatherCtn">
            <h2>Coming up this week</h2>
            <ul>
            {noonWeather.map((day, index) => (
                <li key={day.date} className="forecastDayCtn">
                    <p>{formatDate(day.date)}</p>
                    <p className="temp">{roundTemperature(day.mainTemp)}°C <span>/ {roundTemperature(day.feelsLike)}°C</span></p>
                    {/* <p>{capitalize(day.description)}</p> */}
                    <div className="forecastImgCtn">
                      <img src={customWeatherIconUrl[index]} alt={day.description} />
                    </div>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default ForecastWeather;