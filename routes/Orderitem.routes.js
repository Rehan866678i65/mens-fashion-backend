const express = require("express");
const router = express.Router();
const OrderItemController = require("../controller/Orderitem.Controller");

// add order item
router.post("/add", OrderItemController.insertData);

// get all
router.get("/all", OrderItemController.getDataAll);

// get by id
router.get("/:id", OrderItemController.getDataById);

// update
router.put("/:id", OrderItemController.updateData);

// delete
router.delete("/:id", OrderItemController.deleteData);

module.exports = router;
