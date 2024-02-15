const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const authorization = require("../../middleware/authorization");

router.get("/dashboard", authorization, async (req, res) => {
    try {
        const user = await pool.query("SELECT user_email FROM users WHERE user_id = $1", [req.user.id]);

        res.json(user.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Server error.` });
    }
});

//POST request to save the city to database
router.post("/favorite_city", authorization, async(req, res) => {
    const { city_name } = req.body;
    const user_id = req.user.id; // Get user ID from the authenticated user

    try {
        // Check if the user has already favourited a city
        const existingFavoriteResult = await pool.query('SELECT * FROM favorites WHERE user_id = $1', [user_id]);
        
        if (existingFavoriteResult.rows.length > 0) {
            // If the user has already favourited a city, unfavourite the old city
            await pool.query('DELETE FROM favorites WHERE user_id = $1', [user_id]);
        }
        const result = await pool.query('INSERT INTO favorites (user_id, city_name) VALUES ($1, $2) RETURNING *', [user_id, city_name]);

        const savedCity = result.rows[0];

        res.json({ city_name: savedCity.city_name });

    } catch (error) {
        console.error('Error saving favorite city:', error);
        res.status(500).json({ error: 'An error occurred while saving favorite city' });
    }
});

//GET request to retrive the city saved from the database
router.get("/favorite_city", authorization, async (req, res) => {
    try {
        const user_id = req.user.id;
        const favoriteCityResult = await pool.query('SELECT city_name FROM favorites WHERE user_id = $1', [user_id]);

        if (favoriteCityResult.rows.length > 0) {
            res.json({ city_name: favoriteCityResult.rows[0].city_name });
        } else {
            res.status(404).json({ error: 'Favorite city not found' });
        }
    } catch (error) {
        console.error('Error retrieving favorite city:', error);
        res.status(500).json({ error: 'An error occurred while retrieving favorite city' });
    }
});


module.exports = router;