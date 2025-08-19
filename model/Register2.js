const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Nema: {
      type: String,
      required: true, // Nema must be provided
      trim: true,
    },
    email: {
      type: String,
      required: true, // Email must be provided
      unique: true,   // Avoid duplicate emails
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // Password must be provided
    },
    company: {
      type: String,
      trim: true,
    },
    addressLine1: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"], // Only allow active/inactive
      default: "active",
    },
  },
  {
    timestamps: true, // Automatically add createdAt & updatedAt
  }
);

module.exports = mongoose.model("User2", userSchema);
