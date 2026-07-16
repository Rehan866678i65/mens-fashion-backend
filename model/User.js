const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, // Email unique hona chahiye
        lowercase: true 
    },
    mobile: { 
        type: String, 
        required: true, 
        unique: true // Mobile number bhi unique hona chahiye
    },
    password: { 
        type: String, 
        required: true 
    },
    otp: { 
        type: String // Registration ke time OTP store karne ke liye
    },
    isVerified: { 
        type: Boolean, 
        default: false // Jab tak OTP verify nahi hota, ye false rahega
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);