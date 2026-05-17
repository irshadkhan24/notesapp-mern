import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const middleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // ✅ Check if header exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token, authorization denied"
            });
        }

        // ✅ Extract token
        const token = authHeader.split(" ")[1];

        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        // ✅ Find user
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // ✅ Attach user to request
        req.user = { name: user.name, id: user._id };

        next();
    } catch (error) {
        console.log("Middleware Error:", error.message); // 🔥 IMPORTANT DEBUG

        return res.status(401).json({
            success: false,
            message: "Token expired or invalid"
        });
    }
};

export default middleware;