const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'memonraiyan669@gmail.com', // Apna Gmail yahan likho
        pass: 'gzipdtoaihkiweps'      // Apna 16-digit App Password yahan dalo
    }
});

exports.registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        // 1. Check if user already exists
        let user = await User.findOne({ $or: [{ email }, { mobile }] });

        if (user) {
            // AGAR USER HAI AUR VERIFIED BHI HAI -> Tabhi error do
            if (user.isVerified) {
                return res.status(400).json({ 
                    message: "Email or Mobile number already registered and verified. Please login." 
                });
            } 
            // AGAR USER HAI LEKIN VERIFIED NAHI HAI -> Toh use naya OTP bhej do aur details update kar do
            else {
                console.log("User exists but not verified. Updating details and sending new OTP...");
                
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
                user.name = name;
                user.mobile = mobile;
                const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                user.otp = newOtp;

                // Naya Mail bhejo
                const mailOptions = {
                    from: '"Hexashop" <memonraiyan669@gmail.com>',
                    to: email,
                    subject: 'Hexashop - New Verification Code',
                    text: `Hello ${name}, your new verification OTP is: ${newOtp}`
                };
                await transporter.sendMail(mailOptions);
                
                await user.save();
                return res.status(200).json({ 
                    message: "User already pending verification. New OTP sent to your email!" 
                });
            }
        }

        // 2. AGAR USER BILKUL NAYA HAI -> Toh naya create karo (Aapka purana logic)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

        const mailOptions = {
            from: '"Hexashop" <memonraiyan669@gmail.com>',
            to: email,
            subject: 'Hexashop Account Verification',
            text: `Hello ${name}, your verification OTP is: ${generatedOtp}`
        };

        await transporter.sendMail(mailOptions);

        user = await User.create({
            name,
            email,
            mobile,
            password: hashedPassword,
            otp: generatedOtp,
            isVerified: false
        });

        res.status(201).json({ 
            message: "OTP sent! Please verify your email to activate your account.",
            userId: user._id 
        });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Something went wrong or Email failed!" });
    }
};


// 3. VERIFY OTP
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (user && user.otp == otp) {
        user.isVerified = true; // <--- Ab user verified ho gaya
        user.otp = undefined;   // OTP delete kar dein
        await user.save();
        return res.status(200).json({ message: "Verification successful!" });
    } else {
        return res.status(400).json({ message: "Invalid OTP" });
    }
};

// 2. LOGIN USER (Email/Password match logic)
exports.loginUser = async (req, res) => {
    try {
     // loginUser ke andar sabse upar ye line add karein
const { email, password } = req.body;
// const normalizedEmail = email.toLowerCase().trim(); // Space aur Case ki tension khatam
// console.log("Full Request Body:", req.body);
const user = await User.findOne({ email:email });
console.log("user found:",user)


        // FIX: Pehle check karo user exist karta hai ya nahi
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password 1" });
        }

        // 2. Check karo ki user verified hai ya nahi
        if (!user.isVerified) {
            return res.status(401).json({ 
                message: "Account not verified! Please verify your email first." 
            });
        }

        // 3. Password Match Karo (Ab crash nahi hoga kyunki humne upar check kar liya hai ki user null nahi hai)
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

            res.json({
                user: { // Ek clean object bhejna hamesha better hota hai
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                },
                token: token
            });
        } else {
            res.status(401).json({ message: "Invalid email or password 2" });
        }

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: error.message });
    }
};


// 4. FORGOT PASSWORD (Email par OTP bhejne ke liye)
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Is email se koi account nahi hai!" });
        }

        // 1. Naya OTP generate karo
        const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // 2. Database mein OTP update karo
        user.otp = resetOtp;
        await user.save();

        // 3. EMAIL BHEJO (Ye zaroori hai!)
        const mailOptions = {
            from: 'Hexashop <memonraiyan669@gmail.com>',
            to: email,
            subject: 'Password Reset OTP - Hexashop',
            text: `Aapka password reset karne ke liye OTP hai: ${resetOtp}`
        };

        await transporter.sendMail(mailOptions);

        console.log(`FORGOT PASSWORD OTP for ${email}: ${resetOtp}`);

        res.status(200).json({ message: "Password reset OTP aapke email par bhej diya gaya hai." });
        
    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ message: "Email bhejne mein error aaya!" });
    }
};

// // 5. RESET PASSWORD (Naya password set karne ke liye)
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP or email number" });
        }

        // Naye password ko hash karo
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password and clear OTP
        user.password = hashedPassword;
        user.otp = undefined;
        await user.save();

        res.status(200).json({ message: "Password updated successfully! Ab aap login kar sakte hain." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};