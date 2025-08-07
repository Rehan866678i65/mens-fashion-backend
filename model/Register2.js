const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Nema: String,
    email: String,
    password: String,
    company: String,
    addressLine1: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User2", userSchema);
