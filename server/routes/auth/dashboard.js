const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const authorization = require("../../middleware/authorization");

router.get("/", authorization, async (req, res) => {
    try {
        const user = await pool.query("SELECT user_email FROM users WHERE user_id = $1", [req.user.id]);

        res.json(user.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Server error.` });
    }
});

router.post("/favorite_city", authorization, async(req, res) => {
    const { city_name } = req.body;
    const user_id = req.user.id; // Get user ID from the authenticated user

    try {
        // Retrieve the user_id from your database
        const userResult = await pool.query('SELECT u.user_id FROM users u LEFT JOIN favorites f ON u.user_id = f.user_id WHERE u.user_id = $1', [user_id]);
        
        // Check if user_id exists in the database
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const getUserId = userResult.rows[0].user_id;

        const result = await pool.query('INSERT INTO favorites (user_id, city_name) VALUES ($1, $2) RETURNING *', [getUserId, city_name]);

        const savedCity = result.rows[0];

        res.json({ user_id: savedCity.user_id, city_name: savedCity.city_name });

    } catch (error) {
        console.error('Error saving favorite city:', error);
        res.status(500).json({ error: 'An error occurred while saving favorite city' });
    }
});

module.exports = router;