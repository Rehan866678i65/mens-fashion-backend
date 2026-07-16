const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    Brand: { type: String, required: true },
    images: [{ type: String }], // ✅ multiple images
    video: { type: String },    // ✅ optional single video
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
