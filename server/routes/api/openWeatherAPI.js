const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/authorization");

router.use(authorization);

router.get("/", async (req, res) => {
    try {
        //dynamically import 'node-fetch' as an ECMAScript Module
        const { default: fetch } = await import("node-fetch");
        
        //get the city name from the req.body
        const { city } = req.query;

        //check that input field is not empty
        if (!city) {
            return res.status(400).json({ message: "This field is required." });
        }

        //ppenWeather API key
        const API_KEY = process.env.API_KEY;

        //construct the API URL with the actual city name and API key
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`;

        console.log(apiUrl);

        const response = await fetch(apiUrl);

        //check if the response is successful
        if (!response.ok) {
            throw new Error(`OpenWeather API request failed with status: ${response.status}`);
        }

        const parseResponse = await response.json();
        console.log(parseResponse);

        res.json(parseResponse);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Internal server error.` });
    }
});

module.exports = router;
