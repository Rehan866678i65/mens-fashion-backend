const Product = require("../model/Product");

class ProductController {

    // 1️⃣ DATA ADD KARNA
static async insertData(req, res) {
    try {
        console.log("Request body:", req.body);
        const product = await Product.create(req.body);
        console.log("Inserted product:", product);
        res.status(201).json({
            success: true,
            message: "Product add ho gaya",
            data: product
        });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


    // 2️⃣ SAB DATA LANA
 // 2️⃣ SAB DATA LANA (Filter ke saath)
static async getDataAll(req, res) {
    try {
        // URL se category name pakadne ke liye (e.g. ?category=Mens)
        const { category } = req.query;
        
        let filter = {};
        
        // Agar URL mein category aayi hai, toh usse filter object mein daal do
        if (category) {
            filter.category = category; 
        }

        // 'filter' pass karo: agar empty hai {} toh saare aayenge, agar value hai toh filtered aayenge
        const products = await Product.find(filter); 
        
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
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
            const product = await Product.findById(req.params.id).populate("category");

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product nahi mila"
                });
            }

            res.status(200).json({
                success: true,
                data: product
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
            const product = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product nahi mila"
                });
            }

            res.status(200).json({
                success: true,
                message: "Product update ho gaya",
                data: product
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
            const product = await Product.findByIdAndDelete(req.params.id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product nahi mila"
                });
            }

            res.status(200).json({
                success: true,
                message: "Product delete ho gaya"
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
}

module.exports = ProductController;
