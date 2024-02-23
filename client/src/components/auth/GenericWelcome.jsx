const GenericWelcome = ({ cityInputRef }) => {

    const handleNowClick = () => {
        if (cityInputRef.current) {
            cityInputRef.current.focus();
        } else {
            console.error("cityInputRef is null or not yet initialized.");
        }
    }

    return (
        <div className="genericCtn">
            <div>
                <p>Welcome to your basic-ass weather app!</p>
                <p>Get your daily and forecast weather <span onClick={handleNowClick} className="now">now</span>.</p>
            </div>
            <img src="./assets/04d.png" alt="weather icon"/>
        </div> 
    );

}

export default GenericWelcome;