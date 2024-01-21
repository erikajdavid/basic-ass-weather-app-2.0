import React, { useState, useEffect } from "react";

const Dashboard = ({ setAuth }) => {

    const [email, setEmail] = useState("");

    const displayEmail = async () => {
        try {
            const response = await fetch("http://localhost:3500/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token } 
            });

            const parseResponse = await response.json();

            console.log(parseResponse);

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

    return (
        <div className="dashboardCtn">
            <h1>Welcome, {email}</h1>
            <button onClick={logoutUser}>Log out</button>
        </div>

    );
}

export default Dashboard;