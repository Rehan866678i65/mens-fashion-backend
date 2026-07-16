const express = require("express");
const router = express.Router();
const { createRazorpayOrder } = require("../controller/payment.controller");

const { verifyRazorpayPayment } = require("../controller/payment.controller");

router.post("/razorpay/verify", verifyRazorpayPayment);

router.post("/razorpay/create-order", createRazorpayOrder);

module.exports = router;
