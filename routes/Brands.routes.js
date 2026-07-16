const express = require("express");
const router = express.Router();
const BrandsController = require("../controller/Brands.Controller");

router.post("/", BrandsController.insertData);
router.get("/", BrandsController.getDataAll);
router.get("/:id", BrandsController.getDataById);
router.put("/:id", BrandsController.updateData);
router.delete("/:id", BrandsController.deleteData);
router.get("/name/:name", BrandsController.BrandModelNameid);

module.exports = router;