import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    const handlePasswordToggle = () => {
        setHidePassword(!hidePassword);
    }

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            //does stuff
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
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
                    placeholder="Email:"
                />

                <div>
                    <label htmlFor="password"></label>
                    <input 
                        type={ hidePassword ? "password" : "text "}
                        name="password"
                        id="password"
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                        required={ true }
                        placeholder="Password:"
                    />
                    <FontAwesomeIcon
                        onClick={ handlePasswordToggle }
                        icon={ hidePassword ? faEyeSlash : faEye }
                    >
                    </FontAwesomeIcon>
                </div>

                <button type="submit">Log in</button>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                <p>Return <Link to="/">home</Link></p>
            </form>
        </>
    );

}

export default Login;