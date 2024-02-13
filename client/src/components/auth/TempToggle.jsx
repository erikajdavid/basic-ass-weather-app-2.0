import { useState } from "react";

const TempToggle = ({handleToggleUnit, unit}) => {
    const [isMetric, setIsMetric] = useState(unit === 'metric');

    const handleToggleClick =  () => {
        const newUnit = isMetric ? 'imperial' : 'metric';
        setIsMetric(!isMetric);
        handleToggleUnit(newUnit); 
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