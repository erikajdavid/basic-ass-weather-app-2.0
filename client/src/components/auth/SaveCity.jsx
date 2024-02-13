import React, { useState } from "react";

const SaveCity = () => {
    const [isSaved, setIsSaved] = useState(false);

    const handleSaveClick = () => {
        setIsSaved(!isSaved);
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
