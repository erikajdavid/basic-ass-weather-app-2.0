const express = require("express");
const router = express.Router();
const pool = require("../db");

//register user
router.post("/register", async(req, res) => {
    try {
        //do stuff
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Internal server error.`});
    }
});

//login user
router.post("/register", async(req, res) => {
    try {
        //do stuff
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Internal server error.`});
    }
});

module.exports = router;