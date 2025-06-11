const express = require("express");
const verifyToken = require("../middleware/jwtToken.middleware");
const router = express.Router();

router.get("/protected", verifyToken, (req, res) => {
  console.log("✅ Inside /protected route"); // Add this
  res.json({ message: "You accessed a protected route", user: req.user });
});


module.exports = router;
