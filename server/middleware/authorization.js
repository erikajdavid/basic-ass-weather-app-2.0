const jwt = require("jsonwebtoken");

const auth = async(req, res, next) => {
    const token = req.header("token");
    
    //is there no token, return error
    if (!token) {
        return res.status(403).json({ message: `Unauthorized.` });
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = payload.user;

        next();

    } catch (error) {
        console.error(error.message);
        return res.status(403).json({ message: `Unauthorized.` })
    }
    console.log(token);
};

module.exports = auth;