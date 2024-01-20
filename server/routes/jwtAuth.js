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
        console.log(user);
        if (user.rows.lenght > 0) {
            return res.status(409).json({ message: `User with this email already exists.`})
        }

        //if the user doesn't exist, continue with the registration process and encrypt the password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const bcryptPasswordVerify = await bcrypt.hash(passwordVerify, salt);

         //check if the passwords match
         if (password !== passwordVerify) {
            return res.status(400).json({ message: `Passwords do not match`});
        }

        const newUser = await pool.query("INSERT INTO users (user_email, user_password, user_password_verify) VALUES ($1, $2, $3) RETURNING*", [email, bcryptPassword, bcryptPasswordVerify]);

        res.status(201).json(newUser.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Internal server error.`});
    }
});

//login user
router.post("/login", async(req, res) => {
    try {
        //expecting these from req.body
        const { email, password } = req.body;
        
        //if no email and/or password, return an error
        if (!email || !password ) {
            return res.status(400).json({ message: `All input fields are required.` })
        }

        //check if user exists in the database
        const existingUser = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (!existingUser) {
            return res.json(401).json({ message: `Unauthorized.` })
        }

        //if the user exists, compare password with bcryptPassword
        const passwordCorrect = await bcrypt.compare(password, existingUser.rows[0].user_password);

        //if password is not correct, return an error
        if (!passwordCorrect) {
            return res.json(401).json({ message: `Unauthorized.` })
        }

        res.json(existingUser.rows[0]);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Internal server error.`});
    }
});

module.exports = router;