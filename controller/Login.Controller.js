const jwt = require("jsonwebtoken");
const Register = require("../model/Register");
// const bcrypt = require("bcryptjs");

const JWT_SECRET = "your_jwt_secret_key"; // Replace with environment variable in production

class LoginController {
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }

      const user = await Register.findOne({ email });

      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      // ✅ Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.status(200).json({
        success: true,
        message: "Login successful",
        token, // Include the token
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  }
}

module.exports = LoginController;
