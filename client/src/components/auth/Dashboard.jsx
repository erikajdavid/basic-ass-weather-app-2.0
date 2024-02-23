import React, { useState, useEffect, useRef } from "react";
import Search from "./Search";
import Weather from "./weather/WeatherCard";
import Logout from "./Logout";
import Footer from "../Footer";
import FormError from "./FormError";
import GenericWelcome from "./GenericWelcome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Dashboard = ({ setAuth }) => {
    const [email, setEmail] = useState("");
    const [dailyWeather, setDailyWeather] = useState(null);
    const [forecastWeather, setForecastWeather] = useState(null);
    const [welcome, setWelcome] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [cityName, setCityName] = useState("");
    const [favoriteCity, setFavoriteCity] = useState(""); // State to store favorite city

    const cityInputRef = useRef(null);

    const myHeaders = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.token || ""}`
    };

    const displayEmail = async () => {
        try {
            const response = await fetch("http://localhost:3500/auth/dashboard/", {
                method: "GET",
                headers: myHeaders
            });

            const parseResponse = await response.json();
            setEmail(parseResponse.user_email);

        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        displayEmail();
    }, []);

    const fetchWeather = async (city) => {
        try {
            setLoading(true); // Set loading to true when the search starts

            // Daily weather API call
            const dailyResponse = await fetch(`http://localhost:3500/weather/dailyWeather?city=${encodeURIComponent(city)}`, {
                method: "GET",
                headers: myHeaders
            });
            const dailyParseResponse = await dailyResponse.json();
            if (dailyResponse.status === 404) {
                setError(`City not found. Please try again.`);
            } else {
                setError("");
            }

            setDailyWeather(dailyParseResponse);

            // Forecast API call
            const forecastResponse = await fetch(`http://localhost:3500/weather/forecast?city=${encodeURIComponent(city)}`, {
                method: "GET",
                headers: myHeaders
            });

            const forecastParseResponse = await forecastResponse.json();
            if (forecastResponse.status === 404) {
                setError(`City not found. Please try again.`);
            } else {
                setError("");
            }

            setForecastWeather(forecastParseResponse);
            setWelcome(false);
            setCityName(city);

        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchFavoriteCity = async () => {
            try {
                const response = await fetch("http://localhost:3500/auth/favorite_city", {
                    method: "GET",
                    headers: myHeaders, 
                });

                const parseResponse = await response.json();
                console.log(parseResponse);

                setFavoriteCity(parseResponse.city_name); 

                if (parseResponse.city_name) {
                    // Fetch weather data for favorite city
                    await fetchWeather(parseResponse.city_name);
                }

            } catch (error) {
                console.error(error.message);
            }
        };

        fetchFavoriteCity();
    }, []); 

    const handleSearch = async (city) => {
        await fetchWeather(city);
    };

    return (
        <>
            <header>
                <nav className="wrapper">
                    <div className="welcomeCtn">
                        <FontAwesomeIcon icon={ faUser } className="faUserCtn"></FontAwesomeIcon>
                        <p>Hello, {email}!</p>
                    </div>
                    <div className="dashNavRight">
                        <Search handleSearch={handleSearch} loading={loading} cityInputRef={cityInputRef} />
                        <Logout setAuth={setAuth}/>
                    </div>
                </nav>
            </header>
            <section className="dashboardCtn wrapper">
                {welcome && !favoriteCity ? (
                    <GenericWelcome cityInputRef={cityInputRef}/>
                ) : (
                    error !== "" ? (
                        <div className="cityErrorCtn">
                            <div className="textFace">¯\_(ツ)_/¯</div>
                            <FormError error={error}/>
                        </div>
                    ) : (
                        <Weather cityName={cityName} dailyWeather={dailyWeather} favoriteCity={favoriteCity} setFavoriteCity={setFavoriteCity} forecastWeather={forecastWeather}/>
                    )
                )}
            </section>
            <Footer />
        </>
      );
};

export default Dashboard;
