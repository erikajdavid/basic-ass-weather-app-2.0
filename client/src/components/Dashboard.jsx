import React from "react";

const Dashboard = ({ setAuth }) => {

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
            <h1>Welcome authenticated user</h1>
            <button onClick={logoutUser}>Log out</button>
        </>

    );
}

export default Dashboard;