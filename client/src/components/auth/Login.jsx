import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import Loading from "./LoadingSpinner";

//NOTES for later/improvement - hide password concept is similar to that of signup, can we isolate hide password into it's own component? refactor the toggle function into the return code? 

const Login = ({ setAuth }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePasswordToggle = () => {
        setHidePassword(!hidePassword);
    }

    const handleLoadingState = () => {
        setIsLoading(true);
    };

    const loginUser = async (e) => {
        e.preventDefault()
            try {
                const body = {
                    email,
                    password
                }
    
                const response = await fetch("http://localhost:3500/auth/login", {
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
                    console.error("Login failed:", response.status, response.statusText);

                    if (response.status === 401) {
                        setError(`Email and/or password is invalid. Please try again.`)
                    } else if (response.status === 400) {
                        setError(`All input fields are required`);
                        setIsLoading(false);
                    }
                }
            } catch (error) {
            console.error(error.message);
            }
    };

    return (
        <div className="formContainer">
            <form onSubmit={ loginUser }>
                <h1>Log in</h1>

                <label htmlFor="email"></label>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                    required={ true }
                    autoComplete="off"
                    placeholder="Email:"
                />

                <div className="passwordInputCtn">
                    <label htmlFor="password"></label>
                    <input 
                        type={ hidePassword ? "password" : "text "}
                        name="password"
                        id="password"
                        value={ password }
                        className="passwordInput"
                        onChange={ (e) => setPassword(e.target.value) }
                        required={ true }
                        placeholder="Password:"
                    />
                    <FontAwesomeIcon
                        onClick={ handlePasswordToggle }
                        icon={ hidePassword ? faEyeSlash : faEye }
                        className="eyeIcon"
                    >
                    </FontAwesomeIcon>
                </div>

                {error && <p className="error">{error}</p>}


                <button
                    type="submit"
                    className={`submitButton ${!email || !password ? 'buttonDisabled' : 'buttonEnabled'}`}
                    disabled={!email || !password}
                    onClick={handleLoadingState}
                >
                    {isLoading ? <Loading /> : `Log in`}
                    
                </button>
                
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                <p>Return <Link to="/">home</Link></p>
            </form>
        </div>

    );

}

export default Login;