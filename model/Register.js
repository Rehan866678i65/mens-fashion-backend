// models/User.js (અથવા જ્યાં તમારું schema છે)
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  role: [{ type: String, required: true }], // <<<< આ CHANGE છે
});

module.exports = mongoose.model("User", userSchema);
