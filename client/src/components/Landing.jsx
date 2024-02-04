import { Link } from "react-router-dom";
import Footer from "./Footer";

const Landing = () => {

    return (
        <>
            <header>
                <nav className="wrapper">
                    <Link to="/"><img className="logo" src="./assets/logo.png" alt="sun"/></Link>
                    <Link to="/login"><button className="buttonInversed">Log in</button></Link>
                </nav>
            </header>
            <main className="landingCtn wrapper">
                <div className="landingTextCtn">
                    <h1>My basic-ass weather app</h1>
                    <div className="landingText">
                        <p>A real-time global weather app that is nowhere near as complex as the one you're already using.</p>
                    </div>
                    <Link to="/signup"><button>Register now</button></Link>
                </div>
                <div className="landingImgCtn">
                    <img src="./assets/landingImg.png" alt="2-D weather illustration"></img>
                </div>
            </main>
            <Footer />
        </>
    );
    
};

export default Landing;