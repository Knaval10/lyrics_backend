// In authMiddleware.js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

// isSuperAdmin middleware
const isSuperAdmin = (req, res, next) => {
    if (req.user.email === process.env.SUPERADMIN_EMAIL) {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Only superadmin can perform this action." });
    }
};

module.exports = { protect, isSuperAdmin };
