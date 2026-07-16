

const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/categor.Controller");

router.post("/", CategoryController.insertData);
router.get("/", CategoryController.getDataAll);
router.get("/:id", CategoryController.getDataById);
router.put("/:id", CategoryController.updateData);
router.delete("/:id", CategoryController.deleteData);
router.get("/name/:name", CategoryController.CategoryNameid);

module.exports = router;
