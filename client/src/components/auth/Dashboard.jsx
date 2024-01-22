import React, { useState, useEffect } from "react";

const Dashboard = ({ setAuth }) => {

    const [email, setEmail] = useState("");

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

    const searchWeather = async () => {
       try {

            const city = document.getElementById("cityInput").value;

            const response = await fetch(`http://localhost:3500/weather?city=${encodeURIComponent(city)}`, {
                method: "GET",
                headers: myHeaders
            });

            const parseResponse = await response.json();
            console.log(parseResponse);
        
       } catch (error) {
        console.error(error.message);
       }
    };

    return (
        <>
            <div className="dashboardCtn">
                <h1>Welcome, {email}</h1>
                <button onClick={logoutUser}>Log out</button>
            </div>
            <div>
                <input type="text" id="cityInput" placeholder="Enter city" required></input>
                <button type="submit" onClick={searchWeather}>Search Weather</button>
            </div>

        </>
    );
}

export default Dashboard;