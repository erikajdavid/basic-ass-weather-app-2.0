const Logout = ({ setAuth }) => {

    const logoutUser = async (e) => {
        e.preventDefault();
    
        try {
            //delete token from localstorage
            localStorage.removeItem("token");
    
            setAuth(false);
            
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <button className="buttonInversed" onClick={logoutUser}>Log out</button>
    );

};

export default Logout;