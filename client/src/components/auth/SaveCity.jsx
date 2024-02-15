import React, { useState, useEffect } from "react";

const SaveCity = ({ cityName, favoriteCity, setFavoriteCity }) => {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setIsSaved(cityName === favoriteCity);
    }, [cityName, favoriteCity]);

    const myHeaders = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.token || ""}`
    }

    const handleSaveClick = async () => {
        try {
            if (isSaved) {
                // If the city is already saved, deleted the city
                const response = await fetch("http://localhost:3500/auth/favorite_city", {
                    method: "DELETE",
                    headers: myHeaders,
                    body: JSON.stringify({ city_name: cityName })
                });

                const parseResponse = await response.json();
                console.log(parseResponse);
                setFavoriteCity("");

            } else { 
                const response = await fetch("http://localhost:3500/auth/favorite_city", {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify({ city_name: cityName })
                });

                const parseResponse = await response.json();
                console.log(parseResponse);
                setFavoriteCity(cityName); 
            }

        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="saveCity" onClick={handleSaveClick} >
            {isSaved ? (
                <div className="saveCityCtn">
                    <p>Remove this city as your homepage.</p>
                    <i className="fa-solid fa-heart" title="Remove this city as your homepage."></i>
                </div>
                
            ) : (
                <div className="saveCity">
                    <p>Set this city as your homepage.</p>
                    <i className="fa-regular fa-heart" title="Set this city as your homepage."></i>
                </div>
            )}
        </div>
    );
};

export default SaveCity;