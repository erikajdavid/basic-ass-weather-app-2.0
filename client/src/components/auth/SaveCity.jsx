import React, { useState } from "react";

const SaveCity = ({ cityName }) => {
    const [isSaved, setIsSaved] = useState(false);

    const myHeaders = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.token || ""}`
    }

    const handleSaveClick = async () => {
        try {
            const response = await fetch("http://localhost:3500/auth/favorite_city", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({ city_name: cityName }) // Send city_name in the request body
            });

            const parseResponse = await response.json();
            console.log(parseResponse);
            setIsSaved(!isSaved);

        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="saveCity" onClick={handleSaveClick} >
            {isSaved ? (
                <i className="fa-solid fa-heart" title="Remove this city as your homepage."></i>
            ) : (
                <i className="fa-regular fa-heart" title="Set this city as your homepage."></i>
            )}
        </div>
    );
};

export default SaveCity;