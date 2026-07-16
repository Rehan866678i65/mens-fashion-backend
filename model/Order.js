const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shippingAddress: {
    firstName: { type: String, required: true, uppercase: true },
    lastName: { type: String, required: true, uppercase: true },
    streetAddress: { type: String, required: true, uppercase: true },
    city: { type: String, required: true, uppercase: true },
    postalCode: { type: String, required: true }
  },
  items: [{
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product',
      required: true 
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    image: { type: String }
  }],
  paymentMethod: {
    type: String,
    enum: ['UPI', 'CARD'],
    required: true,
    default: 'UPI'
  },
  
  // 🔴 RAZORPAY FIELDS (Add these for payment verification)
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },

  subtotal: { type: Number, required: true },
  shippingFee: { type: Number, required: true, default: 99 },
  totalAmount: { type: Number, required: true },

  status: {
    type: String,
    enum: ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);