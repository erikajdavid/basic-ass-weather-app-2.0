const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../utils/jwtGenerator");
const authorization = require("../../middleware/authorization");

//NOTES FOR IMPROVEMENT - lots of repetition here regarding validation checks. worth extracting and organizing in a file in middlewear. 

//register user
router.post("/register", async(req, res) => {
    try {
        //expecting these from the req.body
        const { email, password, passwordVerify } = req.body;

        //check if email is in valid format 
        const isEmailValid = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        //if email is invalid, return error
        if (!isEmailValid(email)) {
            return res.status(400).json({ message: `Please format email correctly.` })
        }

        //if one of the input fields is empty, return and error
        if (!email || !password || !passwordVerify) {
            return res.status(400).json({ message: `All input fields are required. Why is this happening.`});
        }

        //check for a duplicate user
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        //if a user already exists, return an error
        console.log(user);
        if (user.rows.length > 0) {
            return res.status(409).json({ message: `User with this email already exists.`})
        }

        //if the user doesn't exist, continue with the registration process and encrypt the password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const bcryptPasswordVerify = await bcrypt.hash(passwordVerify, salt);

        //password much be at least 8 characters long
        if (password.length < 8) {
            return res.status(400).json({ message: `Password must be at least 8 characters long.` })
        }
        //check if the passwords match
        if (password !== passwordVerify) {
            return res.status(400).json({ message: `Passwords do not match`});
        }

        //if passwords match, create new user
        const newUser = await pool.query("INSERT INTO users (user_email, user_password, user_password_verify) VALUES ($1, $2, $3) RETURNING*", [email, bcryptPassword, bcryptPasswordVerify]);

        //give user access token
        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });
        
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

        const isEmailValid = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        //if email is invalid, return error
        if (!isEmailValid(email)) {
            return res.status(400).json({ message: `Please format email correctly.` })
        }
        
        //if no email and/or password, return an error
        if (!email || !password ) {
            return res.status(400).json({ message: `All input fields are required.` })
        }

        //check if user exists in the database
        const existingUser = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (!existingUser.rows.length === 0) {
            return res.status(401).json({ message: `Unauthorized.` })
        }

        //if the user exists, compare password with bcryptPassword
        const passwordCorrect = await bcrypt.compare(password, existingUser.rows[0].user_password);

        //if password is not correct, return an error
        if (!passwordCorrect) {
            return res.status(401).json({ message: `Unauthorized.` })
        }

        //if user exists and password is correct, grant user an access token
        const token = jwtGenerator(existingUser.rows[0].user_id);

        res.json({ token });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Internal server error.`});
    }
});

//did user pass authentication? is user verified?

router.get("/is-verified", authorization, async(req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(`Internal server error.`)  
    }
});

//logout user
router.get("/logout", async(req, res) => {
    try {
        //should we handled the logout on the server side instead of client (where the jwt is cleared from local storage)
    } catch (error) {
        console.error(error.message)
        return res.status(500).send(`Internal server error.`)  

    }
});

module.exports = router;