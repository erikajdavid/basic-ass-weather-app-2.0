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
}