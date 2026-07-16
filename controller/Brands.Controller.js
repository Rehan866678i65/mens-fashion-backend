const BrandModel = require("../model/Brands");

class BrandController {

  // 1️⃣ ADD BRAND
  static async insertData(req, res) {
    try {
      const brand = await BrandModel.create(req.body);

      res.status(201).json({
        success: true,
        message: "Brand add ho gaya",
        data: brand
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  // 2️⃣ GET ALL BRANDS
  static async getDataAll(req, res) {
    try {
      const brands = await BrandModel.find();

      res.status(200).json({
        success: true,
        data: brands
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  // 3️⃣ GET BRAND BY ID
  static async getDataById(req, res) {
    try {
      const brand = await BrandModel.findById(req.params.id);

      if (!brand) {
        return res.status(404).json({
          success: false,
          message: "Brand nahi mila"
        });
      }

      res.status(200).json({
        success: true,
        data: brand
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  // 4️⃣ UPDATE BRAND
  static async updateData(req, res) {
    try {
      const brand = await BrandModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!brand) {
        return res.status(404).json({
          success: false,
          message: "Brand nahi mila"
        });
      }

      res.status(200).json({
        success: true,
        message: "Brand update ho gaya",
        data: brand
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  // 5️⃣ DELETE BRAND
  static async deleteData(req, res) {
    try {
      const brand = await BrandModel.findByIdAndDelete(req.params.id);

      if (!brand) {
        return res.status(404).json({
          success: false,
          message: "Brand nahi mila"
        });
      }

      res.status(200).json({
        success: true,
        message: "Brand delete ho gaya"
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
   static  async BrandModelNameid(req, res) {
        try {
          var obj = req.params.Name;
          BrandModel.find({
            $and: [
              { Name: obj }
            ]
          })
          .then((response) => {
            console.log(response);
            if (response.length > 0) {
              res.status(200).json({ msg: "Successfully fetched", response });
            } else {
              res.status(404).json({ msg: "No data found" });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              msg: "2. Catch: Something went wrong while fetching data",
              errormsg: err,
            });
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ msg: "1. Catch: Something went wrong in database" });
        }
      }
}

module.exports = BrandController;
