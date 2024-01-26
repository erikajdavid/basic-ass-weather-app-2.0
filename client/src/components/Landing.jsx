import { Link } from "react-router-dom";

const Landing = () => {

    return (
        <>
            <header>
                <nav className="wrapper">
                    <Link to="/">LOGO</Link>
                    <Link to="/login"><button>Log in</button></Link>
                </nav>
            </header>
            <main className="landingCtn wrapper">
                <h1>My basic-ass weather app</h1>
                <div className="landingText">
                    <p>A real-time global weather app that is nowhere near as complex as the one you're already using.</p>
                    <p>Your weather forecast awaits.</p>
                </div>
                <Link to="/signup"><button>Register now</button></Link>
            </main>
            <footer className="wrapper">
                <p>Designed and developed by <a href="https://erikadavid.dev/" target="_blank">Erika David</a></p>
                <p>All rights reserved © 2024</p>
            </footer>
        </>
    );
}

export default Landing;