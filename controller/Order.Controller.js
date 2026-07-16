const Order = require("../model/Order");

// orderController.js
exports.placeOrder = async (req, res) => {
    try {
        const { userId, shippingAddress, items, subtotal, shippingFee, totalAmount, paymentMethod } = req.body;

        // Validation... (Same as yours)
 // 1. Validation Check (Sari zaroori fields check karein)
    if (!userId || !shippingAddress || !items || items.length === 0 || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: UserID, Shipping Address, or Items."
      });
    }
        const order = await Order.create({
            userId,
            shippingAddress,
            items,
            subtotal,
            shippingFee,
            totalAmount,
            paymentMethod,
            // 🔴 Yahan change hai: Shuruat mein hamesha PENDING rahega
            status: "PENDING" 
        });

        res.status(201).json({
            success: true,
            message: "Order initiated",
            orderId: order._id,
            totalAmount: order.totalAmount // Frontend ko amount chahiye hoga
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};