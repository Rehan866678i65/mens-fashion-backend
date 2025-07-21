const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Nema:{type:String},
    DealerName:{type:String},
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  Taluka: { type: String, required: true },
  Alternate: { type: String, required: true },
  password: { type: String, required: true },
  role: [{ type: String, required: true }],

  // ✅ Address fields
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },

  // ✅ 5 Photos (store URLs or file references)
  photos: {
    type: [String], // Array of 5 photo URLs or filenames
    validate: [arrayLimit, "{PATH} must contain exactly 5 photos"],
    default: []
  },

  // ✅ Spare part deduction permission
  sparePartAllowed: { type: String},
});

// Ensure exactly 5 photos (optional strict validation)
function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.model("User", userSchema);
