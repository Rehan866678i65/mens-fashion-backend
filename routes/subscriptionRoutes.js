const express = require("express");
const router = express.Router();
const SubscriptionController = require("../controller/subscription.Controller");

// Routes
router.post("/", SubscriptionController.create);
router.get("/", SubscriptionController.getAll);
router.put("/:id", SubscriptionController.update);
router.delete("/:id", SubscriptionController.delete);
router.put("/check-expiry/all", SubscriptionController.checkExpiry);
router.get("/check-plan/:userId", SubscriptionController.checkUserPlanStatus);
router.get("/user-subscription/:userId", SubscriptionController.getSubscriptionInfo);


module.exports = router;

