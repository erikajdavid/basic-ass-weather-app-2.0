import React from "react";

const Dashboard = () => {

    const logoutUser = async (e) => {
        e.preventDefault();

        try {
            //delete token from localstorage
            localStorage.removeItem("token");
            
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