import React, { useState, useEffect } from "react";
import Search from "./Search";
import Weather from "./weather/WeatherCard";
import Logout from "./Logout";
import Footer from "../Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Dashboard = ({ setAuth }) => {

    const [email, setEmail] = useState("");
    const [dailyWeather, setDailyWeather] = useState(null); // State to store weather data  
    const [forecastWeather, setForecastWeather] = useState(null); // State to store weather data  
    const [welcome, setWelcome] = useState(true);

    const myHeaders = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.token || ""}`
    }

    const displayEmail = async () => {
        try {
            const response = await fetch("http://localhost:3500/dashboard/", {
                method: "GET",
                headers: myHeaders
            });

            const parseResponse = await response.json();

            setEmail(parseResponse.user_email);
            
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        displayEmail();
    }, [])

    const handleSearch = async () => {
        try {
            const city = document.getElementById("cityInput").value;

            // Daily weather API call
            const dailyResponse = await fetch(`http://localhost:3500/weather/dailyWeather?city=${encodeURIComponent(city)}`, {
                method: "GET",
                headers: myHeaders
            });
            const dailyParseResponse = await dailyResponse.json();
            setDailyWeather(dailyParseResponse);
            console.log(dailyParseResponse);

            // Forecast API call
            const forecastResponse = await fetch(`http://localhost:3500/weather/forecast?city=${encodeURIComponent(city)}`, {
                method: "GET",
                headers: myHeaders
            });
            const forecastParseResponse = await forecastResponse.json();
            setForecastWeather(forecastParseResponse);
            console.log(forecastParseResponse);

            setWelcome(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <header>
                <nav className="wrapper">
                    <div className="welcomeCtn">
                        <FontAwesomeIcon icon={ faUser } className="faUserCtn"></FontAwesomeIcon>
                        <p>Welcome, {email}!</p>
                    </div>
                    <div className="dashNavRight">
                        <Search handleSearch={handleSearch} />
                        <Logout setAuth={setAuth}/>
                    </div>
                </nav>
            </header>
            <section>
                {
                    welcome ? <p className="dashboardCtn">HELLO WHAT TO PUT HERE</p> : <Weather dailyWeather={dailyWeather} forecastWeather={forecastWeather}/>
                }
            </section>
            <Footer />
        </>
      );
      
};

export default Dashboard;