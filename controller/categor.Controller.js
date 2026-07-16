const Category = require("../model/Categor");

class CategoryController {

    // 1️⃣ DATA ADD KARNA
    static async insertData(req, res) {
        try {
            const category = await Category.create(req.body);
                 console.log("Request body:", req.body);
            res.status(201).json({
                success: true,
                message: "Category add ho gayi",
                data: category
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    // 2️⃣ SAB DATA LANA
    static async getDataAll(req, res) {
        try {
            const category = await Category.find();
            res.status(200).json({
                success: true,
                data: category
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    // 3️⃣ ID SE DATA LANA
    static async getDataById(req, res) {
        try {
            const category = await Category.findById(req.params.id);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "Category nahi mili"
                });
            }

            res.status(200).json({
                success: true,
                data: category
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    // 4️⃣ DATA UPDATE KARNA
    static async updateData(req, res) {
        try {
            const category = await Category.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "Category nahi mili"
                });
            }

            res.status(200).json({
                success: true,
                message: "Category update ho gayi",
                data: category
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    // 5️⃣ DATA DELETE KARNA
    static async deleteData(req, res) {
        try {
            const category = await Category.findByIdAndDelete(req.params.id);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "Category nahi mili"
                });
            }

            res.status(200).json({
                success: true,
                message: "Category delete ho gayi"
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
    

  static  async CategoryNameid(req, res) {
      try {
        var obj = req.params.Name;
        Category.find({
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

module.exports = CategoryController;
