const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Nema: { type: String },
  DealerName: { type: String },
  email: { type: String, required: true, unique: true },  // ✅ Sirf email required rakha
  mobile: { type: Number },
  Taluka: { type: String },
  Alternate: { type: Number },
  password: { type: String },
  role: [{ type: String }],
  userId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User2", 
          required: true 
        },  // 

  // ✅ Address fields
  addressLine1: { type: String },
  addressLine2: { type: String },

  // ✅ Photos (optional)
  photos: {
    type: [String],
    validate: [arrayLimit, "{PATH} must contain max 5 photos"],
    default: []
  },

  // ✅ Spare part deduction permission (optional)
  sparePartAllowed: { type: String },
});

// Ensure maximum 5 photos
function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.model("User", userSchema);
