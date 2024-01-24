import { Link } from "react-router-dom";

const Landing = () => {

    return (
        <>
            <div className="landingCtn wrapper">
                <h1>My basic-ass weather app</h1>
                <p>A real-time global weather app that is nowhere near as complex as the one you're already using.</p>
                <p>Your weather forecast awaits.</p>
                
                <Link to="/signup"><button>Register now</button></Link>
            </div>
            <footer>
                <p>Designed and developed by <a href="https://erikadavid.dev/" target="_blank">Erika David</a></p>
                <p>All rights reserved © 2024</p>
            </footer>
        </>
    );
}

export default Landing;