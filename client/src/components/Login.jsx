import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (e) => {
        e.preventDefault(e)
        try {
            //does stuff
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <form onSubmit={loginUser}>
                <h1>Log in</h1>
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

                <button type="submit">Log in</button>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                <p>Return <Link to="/">home</Link></p>
            </form>
        </>
    );

}

export default Login;