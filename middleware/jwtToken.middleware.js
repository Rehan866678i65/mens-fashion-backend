const jwt = require("jsonwebtoken");
 // same secret as in LoginController

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];  // assuming format "Bearer <token>"

  jwt.verify(token,  (err, decoded) => {
    if (err) {
      console.log("JWT verification failed:", err);
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
