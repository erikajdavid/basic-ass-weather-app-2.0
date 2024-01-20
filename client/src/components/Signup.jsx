import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";

//NOTES for later/improvement - hide password concept is similar to that of login, can we isolate hide password into it's own component? refactor the toggle functions into the return code? 

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const [hidePasswordVerify, setHidePasswordVerify] = useState(true);

    const signupUser = async (e) => {
        e.preventDefault();

        try {
            const body = {
                email,
                password,
                passwordVerify
            }; 

            const response = await fetch("http://localhost:3500/auth/register", {
                method: "POST",
                headers: { "Content-type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseResponse = await response.json();

            //save token in local storage
            localStorage.setItem("token", parseResponse.token);

            } catch (error) {
                console.error(error.message);
            }
    };
    
    const handlePasswordToggle = () => {
        setHidePassword(!hidePassword);
    };

    const handlePasswordVerifyToggle = () => {
        setHidePasswordVerify(!hidePasswordVerify);
    };

    return (
        <>
            <form onSubmit={ signupUser }>
                <h1>Sign up</h1>

                <label htmlFor="email"></label>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                    placeholder="Email:"
                    required
                />

                <div>
                    <label htmlFor="password"></label>
                    <input 
                        type={ hidePassword ? "password" : "text" }
                        name="password"
                        id="password"
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                        placeholder="Password:"
                        required
                    />
                    <FontAwesomeIcon
                        onClick={ handlePasswordToggle }
                        icon={ hidePassword ? faEyeSlash : faEye }
                    />
                </div>
                
                <div>
                    <label htmlFor="passwordVerify"></label>
                    <input 
                        type={ hidePasswordVerify ? "password" : "text" }
                        name="passwordVerify"
                        id="passwordVerify"
                        value={ passwordVerify }
                        onChange={ (e) => setPasswordVerify(e.target.value) }
                        placeholder="Confirm password:"
                        required
                    />
                    <FontAwesomeIcon
                        onClick={ handlePasswordVerifyToggle }
                        icon={ hidePasswordVerify ? faEyeSlash : faEye }
                    />
                </div>

                <button type="submit">Register for an account</button>
                <p>Already have an account? <Link to="/login">Log in</Link></p>
                <p>Return <Link to="/">home</Link></p>
            </form>
        </>
    );
};

export default Signup;