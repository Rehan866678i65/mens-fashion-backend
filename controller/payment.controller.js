const razorpay = require("../routes/config/razorpay");
const Order = require("../model/Order");
const crypto = require("crypto");

// --- Order ID Generate Karna ---
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const options = {
      amount: Math.round(order.totalAmount * 100), // Paise
      currency: "INR",
      receipt: `receipt_${orderId}`
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Save Razorpay Order ID in our DB
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.json({ success: true, razorpayOrder });
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// --- Payment Verify Karna (Signature Check) ---
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // 1. Signature generate karein verify karne ke liye
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // 2. Database mein order status update karein
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { 
          status: "PAID", 
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature 
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Payment Verified Successfully",
        order
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid Signature" });
    }
  } catch (err) {
    console.error("Verify Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};