import { useState } from "react";

const TempToggle = () => {
    const [isMetric, setIsMetric] = useState(true);

    const handleToggleClick = () => {
        setIsMetric(!isMetric);
        onToggle(!isMetric ? "metric" : "imperial");
    };

    return (
        <div className="tempToggleCtn" onClick={handleToggleClick}>
            <p>°C</p>
            <p>°F</p>
            <div 
                className="toggle" 
                onClick={handleToggleClick}
                style={{ right: isMetric ? "10%" : "52%" }}
            >
            </div>
        </div>
    );

}

export default TempToggle;