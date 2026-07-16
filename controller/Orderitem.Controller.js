const OrderItem = require("../model/OrderItem");

class OrderItemController {

    // 1️⃣ ADD ORDER ITEM (POST)
    static async insertData(req, res) {
        try {
            const orderItem = await OrderItem.create(req.body);

            res.status(201).json({
                success: true,
                message: "Order item add ho gaya",
                data: orderItem
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    // 2️⃣ GET ALL ORDER ITEMS
    static async getDataAll(req, res) {
        try {
            const orderItems = await OrderItem.find();

            res.status(200).json({
                success: true,
                data: orderItems
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    // 3️⃣ GET ORDER ITEM BY ID
    static async getDataById(req, res) {
        try {
            const orderItem = await OrderItem.findById(req.params.id);

            if (!orderItem) {
                return res.status(404).json({
                    success: false,
                    message: "Order item nahi mila"
                });
            }

            res.status(200).json({
                success: true,
                data: orderItem
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    // 4️⃣ UPDATE ORDER ITEM
    static async updateData(req, res) {
        try {
            const orderItem = await OrderItem.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!orderItem) {
                return res.status(404).json({
                    success: false,
                    message: "Order item nahi mila"
                });
            }

            res.status(200).json({
                success: true,
                message: "Order item update ho gaya",
                data: orderItem
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    // 5️⃣ DELETE ORDER ITEM
    static async deleteData(req, res) {
        try {
            const orderItem = await OrderItem.findByIdAndDelete(req.params.id);

            if (!orderItem) {
                return res.status(404).json({
                    success: false,
                    message: "Order item nahi mila"
                });
            }

            res.status(200).json({
                success: true,
                message: "Order item delete ho gaya"
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
}

module.exports = OrderItemController;
