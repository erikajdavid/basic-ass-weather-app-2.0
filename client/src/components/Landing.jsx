import { Link } from "react-router-dom";

const Landing = () => {

    return (
        <>
            <h1>My basic-ass weather app</h1>
            <p>A real-time global weather app that is nowhere near as complex as the one you're already using.</p>
            <p>Your weather forecast awaits.</p>
            
            <Link to="/signup">Register now.</Link>
        </>
    );
}

export default Landing;