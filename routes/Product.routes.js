
const express = require("express");
const router = express.Router();
const ProductController = require("../controller/Product.Controller");
const upload = require("../middleware/upload")

// add product
// Add product with multiple images + 1 video
router.post("/", upload.fields([
    { name: "images", maxCount: 4 },
    { name: "video", maxCount: 1 }
]), ProductController.insertData);

// get all
router.get("/", ProductController.getDataAll);

// get by id
router.get("/:id", ProductController.getDataById);

// update
router.put("/:id", ProductController.updateData);

// delete
router.delete("/:id", ProductController.deleteData);

module.exports = router;
