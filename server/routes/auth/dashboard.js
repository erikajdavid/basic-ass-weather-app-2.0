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
})
module.exports = router;