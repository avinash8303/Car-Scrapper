import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('Received token:', token);
    if (!token) {
        console.log('No token provided in request headers.');
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                console.log('JWT verification error:', err);
                return res.status(403).json({ message: "Invalid token" });
            }
            console.log('Decoded JWT payload:', data);
            req.user = data;
            next();
        })
    } catch (err) {
        console.error('JWT verification exception:', err);
        res.status(500).json({ message: "Server Error" });
    }
}

export { authenticate }; 