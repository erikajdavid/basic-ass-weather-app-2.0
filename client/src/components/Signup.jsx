import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <>
            <h1>Sign up</h1>
            <form>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    onValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                    placeholder="Email:"
                />

                <input 
                    type="password"
                    name="password"
                    id="password"
                    onValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                    placeholder="Password:"
                />

                 <input 
                    type="confirmPassword"
                    name="confirmPassword"
                    id="confirmPassword"
                    onValue={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={true}
                    placeholder="Confirm password:"
                />
                
                <button type="submit">Register for an account</button>
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </form>
        </>
    );

}

export default Signup;