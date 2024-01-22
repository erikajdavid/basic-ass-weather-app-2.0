const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    //check if there is no Authorization header
    if (!authHeader) {
        return res.status(403).json({ message: "Unauthorized. No token provided." });
    }

    //split the header to get the token
    const [tokenType, token] = authHeader.split(" ");

    //check if the token type is Bearer
    if (tokenType !== "Bearer" || !token) {
        return res.status(403).json({ message: "Unauthorized. Invalid token format." });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = payload.user;

        next();
    } catch (error) {
        console.error(error.message);
        return res.status(403).json({ message: "Unauthorized. Invalid token." });
    }
};

module.exports = auth;
