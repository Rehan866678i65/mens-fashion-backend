const mongoose = require("mongoose");

const BrandsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: String,
    default: "active" // active / inactive
  }
});

module.exports = mongoose.model("Brands", BrandsSchema);
