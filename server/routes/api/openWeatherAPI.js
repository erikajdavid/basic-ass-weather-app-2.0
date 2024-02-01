const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/authorization");

router.use(authorization);

//daily weather
router.get("/dailyWeather", async (req, res) => {
    try {
        //dynamically import 'node-fetch' as an ECMAScript Module
        const { default: fetch } = await import("node-fetch");
        
        //get the city name from the req.query
        //not req.body because this is not a POST request
        const { city } = req.query;

        //check that input field is not empty
        if (!city) {
            return res.status(400).json({ message: "This field is required." });
        }

        //openWeather API key
        const API_KEY = process.env.API_KEY;

        //construct the API URL with the actual city name and API key
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        console.log(apiUrl);

        const response = await fetch(apiUrl);

        //check if the response is successful
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: "City not found." });
            } else {
                throw new Error(`OpenWeather API request failed with status: ${response.status}`);
            }
        }

        const parseResponse = await response.json();
        console.log(parseResponse);

        res.json(parseResponse);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Internal server error.` });
    }
});

//5-day forecast

router.get("/forecast", async(req, res) => {
    try {
        //dynamically import 'node-fetch' as an ECMAScript Module
        const { default: fetch } = await import("node-fetch");

        const { city } = req.query;

        if (!city) {
            return res.status(400).json({ message: "This field is required." });
        }

        const API_KEY = process.env.API_KEY;

        const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        console.log(apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: "City not found." });
            } else {
                throw new Error(`OpenWeather API request failed with status: ${response.status}`);
            }
        }

        const parseResponse = await response.json();
        console.log(parseResponse);

        res.json(parseResponse);


    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Internal server error.` })
    }
})

module.exports = router;
