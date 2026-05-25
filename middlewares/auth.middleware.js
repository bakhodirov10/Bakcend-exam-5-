const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token required" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = { id: decoded.id || decoded._id }; 
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token invalid", error: err.message });
    }
}