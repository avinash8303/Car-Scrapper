const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }
            req.user = data;
            next();
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }

}

module.exports = verifyToken;