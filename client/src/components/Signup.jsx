import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {

    return (
        <>
            <h1>Sign up</h1>
            <form>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    required={true}
                    placeholder="Email:"
                />
                <input 
                    type="password"
                    name="password"
                    id="password"
                    required={true}
                    placeholder="Password:"
                />
                 <input 
                    type="passwordConfirm"
                    name="passwordConfirm"
                    id="passwordConfirm"
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