const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyOtp,forgotPassword,resetPassword } = require('../controller/user.Controller');

router.post('/register', registerUser);
router.post('/verifyotp', verifyOtp); // Naya route verify ke liye
router.post('/login', loginUser);
router.post('/forgetPassword', forgotPassword);
router.post('/resetpassword', resetPassword);

module.exports = router;