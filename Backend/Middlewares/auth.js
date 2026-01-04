const jwt=require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    //console.log("Authorization Header:", authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: "No authorization header provided." });
    }

    const token = authHeader.split(" ")[1];
  //  console.log("Token from header:", token);

    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
       // console.log("Decoded token:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("Token verification error:", err.message);
        return res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = authMiddleware;