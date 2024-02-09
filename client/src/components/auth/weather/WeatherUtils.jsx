import { format } from "date-fns";

export const getCustomWeatherIconUrl = (id) => {
    if (id >= 200 && id < 300) {
        return "./assets/11d.png";
    } else if (id >= 300 && id < 400) {
        return "./assets/09d.png";
    } else if (id >= 500 && id < 600) {
        return "./assets/04d.png";
    } else if (id >= 600 && id < 700) {
        return "./assets/13d.png";
    } else if (id >= 700 && id < 800) {
        return "./assets/50d.png"
    } else if (id === 800) {
        return "./assets/01d.png"
    } else if (id === 801) {
        return "./assets/02d.png"
    } else if (id >= 802 && id < 900) {
        return "./assets/03d.png"
    }
};

export const capitalize = (str) => {
    if (str && typeof str === 'string') {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      // Return the original string if it's empty or not a string
      return str;
    }
};

export const calculateDayLength = (sunriseTimestamp, sunsetTimestamp) => {
    const dayLengthInSeconds = sunsetTimestamp - sunriseTimestamp;
    const hours = Math.floor(dayLengthInSeconds / 3600);
    const minutes = Math.floor((dayLengthInSeconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
};

export const roundTemperature = (temperature) => {
  return Math.round(temperature);
};

export const formatTime = (timestamp) => {
    const time = new Date(timestamp * 1000);
    const formattedTime = format(time, 'h:ss');
    return formattedTime;
}

export const todayDate = () => {
    const today = new Date();
    const formatDate = format(today, "EEE, MMM d").toUpperCase();
    return formatDate;
};

export const formatForecastDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = format(dateObject, 'eee, MMM d').toUpperCase();
    return formattedDate;
};

