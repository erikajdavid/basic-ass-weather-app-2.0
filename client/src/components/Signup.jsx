import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";


const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

    const signUpUser = async (e) => {
        e.preventDefault(e)
        try {
            //does stuff
        } catch (error) {
            console.error(error.message);
        }
    };

    const handlePasswordToggle = () => {
        setHidePassword(!hidePassword);
    };

    const handleConfirmPasswordToggle = () => {
        setHideConfirmPassword(!hideConfirmPassword);
    };

    return (
        <>
            <form onSubmit={signUpUser}>
                <h1>Sign up</h1>

                <label htmlFor="email"></label>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                    placeholder="Email:"
                />

                <div>
                    <label htmlFor="password"></label>
                    <input 
                        type={hidePassword ? "password" : "text"}
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                        placeholder="Confirm password:"
                    />
                    <FontAwesomeIcon
                        onClick={handlePasswordToggle}
                        icon={hidePassword ? faEyeSlash : faEye}
                    />
                </div>
                
                <div>
                    <label htmlFor="confirmPassword"></label>
                    <input 
                        type={hideConfirmPassword ? "password" : "text"}
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required={true}
                        placeholder="Confirm password:"
                    />
                    <FontAwesomeIcon
                        onClick={handleConfirmPasswordToggle}
                        icon={hideConfirmPassword ? faEyeSlash : faEye}
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