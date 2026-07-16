const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
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

module.exports = mongoose.model("Category", categorySchema);
