const express = require("express");
const router = express.Router();
const OrderController = require("../controller/Order.Controller");

// add order
router.post("/add", OrderController.placeOrder);
// router.get("/all", OrderController.getDataAll);
// router.get("/:id", OrderController.getDataById);
// router.put("/:id", OrderController.updateData);
// router.delete("/:id", OrderController.deleteData);

module.exports = router;
