import React, { useState, useEffect } from "react";
import Search from "./Search";
import Weather from "./Weather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Dashboard = ({ setAuth }) => {

    const [email, setEmail] = useState("");
    const [city, setCity] = useState(""); // State to track the city being searched
    const [weatherData, setWeatherData] = useState(null); // State to store weather data  

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

    const handleSearch = async(e, searchedCity) => {
        e.preventDefault;
        
        setCity(searchedCity);

        try {
            const city = document.getElementById("cityInput").value;
   
            const response = await fetch(`http://localhost:3500/weather?city=${encodeURIComponent(city)}`, {
                method: "GET",
                headers: myHeaders
            });
   
            const parseResponse = await response.json();
   
            setWeatherData(parseResponse);
            console.log(parseResponse);
        
       } catch (error) {
        console.error(error.message);
       }
      };

    const logoutUser = async (e) => {
        e.preventDefault();

        try {
            //delete token from localstorage
            localStorage.removeItem("token");

            setAuth(false);
            
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <header className="wrapper">
                <nav>
                    <div className="welcomeCtn">
                        <FontAwesomeIcon icon={ faUser } className="faUserCtn"></FontAwesomeIcon>
                        <p>Welcome, {email}!</p>
                    </div>
                    <div>
                        <Search handleSearch={handleSearch} />
                        <button onClick={logoutUser}>Log out</button>
                    </div>
                </nav>
            </header>
            <main>
                {/* Display the searched city */}
                {city && <p>Weather for {city}:</p>}
                {/* Display the Weather component with weatherData */}
                {weatherData && <Weather weatherData={weatherData} />}
            </main>
        </>
      );
}

export default Dashboard;