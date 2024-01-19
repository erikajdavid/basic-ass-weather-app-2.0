const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

//register user
router.post("/register", async(req, res) => {
    try {
        //expecting these from the req.body
        const { email, password, passwordVerify } = req.body;

        //if one of the input fields is empty, return and error
        if (!email || !password || !passwordVerify) {
            return res.status(400).json({ message: `All input fields are required.`});
        }

        //check for a duplicate user
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        //if a user already exists, return an error
        if (user.rows.lenght > 0) {
            return res.status(409).json({ message: `User with this email already exists.`})
        }

        //check if the passwords match
        if (password !== passwordVerify) {
            return res.status(400).json({ message: `Passwords do not match`});
        }

        //if the user doesn't exist, continue with the registration process and encrypt the password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users (user_email, user_password, user_password_verify) VALUES ($1, $2, $3) RETURNING*", [email, bcryptPassword, passwordVerify]);

        res.status(201).json(newUser.rows[0]);
        
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