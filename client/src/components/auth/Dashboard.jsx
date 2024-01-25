import React, { useState, useEffect } from "react";
import Search from "./Search";

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

    return (
        <>
            <header className="dashboardCtn wrapper">
                <nav>
                    <p>Welcome, {email}!</p>
                    <button onClick={logoutUser}>Log out</button>
                </nav>
            </header>
            <Search />
        </>
      );
}

export default Dashboard;