const express = require("express");
const verifyToken = require("../middleware/jwtToken.middleware");
// const checkSubscription = require("../middleware/Subscription.Validity");

const router = express.Router();

router.get("/protected", verifyToken, (req, res) => {
  console.log("✅ Inside /protected route");
  console.log("🔐 Decoded User:", req.user); // 👈 log this

  res.json({
    message: "You accessed a protected route",
    user: req.user,
  });
});



// router.get("/dashboard", verifyToken, checkSubscription, (req, res) => {
//   res.json({ message: "Welcome to Admin Dashboard" });
// });




module.exports = router;
