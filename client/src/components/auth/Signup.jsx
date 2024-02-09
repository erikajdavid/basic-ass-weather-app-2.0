import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import LoadingSpinner from "./LoadingSpinner";
import FormError from "./FormError";
import { parse } from "date-fns";

//NOTES for later/improvement - hide password concept is similar to that of login, can we isolate hide password into it's own component? refactor the toggle functions into the return code? 

const Signup = ({ setAuth }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const [hidePasswordVerify, setHidePasswordVerify] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

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

                if (response.ok) {
                    const parseResponse = await response.json();
        
                    // Save token in local storage
                    localStorage.setItem("token", parseResponse.token);
        
                    setAuth(true);

                } else {
                    console.error("Registration failed:", response.status, response.statusText);
                    
                    const parseResponse = await response.json(); 

                    if (parseResponse.type === email) {
                        setError(parseResponse.message);
                    } else if (parseResponse.type === password) {
                        setError(parseResponse.message);
                    } else if (parseResponse.type === passwordVerify) {
                        setError(parseResponse.message);
                    } else if (parseResponse.type === all) {
                        setError(parseResponse.message);
                    } 
                    setIsLoading(false);
                }
                
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

    const handleLoadingSpinner = () => {
        setIsLoading(true);
    };

    return (
        <div className="formContainer">
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
                    autoComplete="off"
                />
                
                <div className="passwordInputCtn">
                    <label htmlFor="password"></label>
                    <input 
                        type={ hidePassword ? "password" : "text" }
                        name="password"
                        id="password"
                        className="passwordInput"
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                        placeholder="Password:"
                        required
                        //minLength={8}
                    />
                    <FontAwesomeIcon
                        onClick={ handlePasswordToggle }
                        icon={ hidePassword ? faEyeSlash : faEye }
                        className="eyeIcon"
                    />
                </div>
                
                <div className="passwordInputCtn">
                    <label htmlFor="passwordVerify"></label>
                    <input 
                        type={ hidePasswordVerify ? "password" : "text" }
                        name="passwordVerify"
                        id="passwordVerify"
                        className="passwordInput"
                        value={ passwordVerify }
                        onChange={ (e) => setPasswordVerify(e.target.value) }
                        placeholder="Confirm password:"
                        required
                        //minLength={8}
                    />
                    <FontAwesomeIcon
                        onClick={ handlePasswordVerifyToggle }
                        icon={ hidePasswordVerify ? faEyeSlash : faEye }
                        className="eyeIcon"
                    />
                </div>

                {error && <FormError error={error}/>}

                <button
                    type="submit"
                    className={`submitButton ${!email || !password || !passwordVerify ? 'buttonDisabled' : 'buttonEnabled'}`}
                    disabled={!email || !password}
                    onClick={handleLoadingSpinner}
                >
                    {isLoading? <LoadingSpinner /> : `Register for an account`}
                </button>

                <p>Already have an account? <Link to="/login">Log in</Link></p>
                <p>Return <Link to="/">home</Link></p>
            </form>
        </div>
    );
    
};

export default Signup;