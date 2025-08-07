// const Subscription = require("../model/Subscription");

// const checkSubscription = async (req, res, next) => {
//   try {
//     const adminId = req.user.id; // JWT se aa raha hoga

//     const subscription = await Subscription.findOne({ adminId });

//     if (!subscription) {
//       return res.status(403).json({ message: "No subscription found" });
//     }

//     const currentDate = new Date();
//     if (new Date(subscription.expiryDate) < currentDate) {
//       return res.status(403).json({ message: "Your subscription has expired. Please renew." });
//     }

//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error in subscription check" });
//   }
// };



// module.exports = checkSubscription;
