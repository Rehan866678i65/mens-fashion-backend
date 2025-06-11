

// controllers/RegisterController.js
// const bcrypt = require("bcryptjs");
const Register = require("../model/Register");
// const Registertbl = require('../model/Register'); // mongoose model

class RegisterController {
  // Create new user account
async insertData(req, res) {
  try {
    const { email, mobile, password, role } = req.body;

    const reg = new Register({
      email,
      mobile,
      password,
      role: Array.isArray(role) ? role : [role], // make sure it's an array
    });

    const response = await reg.save();

    res.status(200).json({
      msg: "Successfully Stored.",
      List: response,
    });
  } catch (err) {
    console.error("Insert error:", err);
    return res.status(500).json({ error: "Internal server error.", details: err.message });
  }
}


   async getAllUsers(req, res) {
    try {
      const users = await Register.find(); // MongoDBમાંથી બધાં users લાવો
      res.status(200).json({ success: true, users });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ success: false, error: "Error fetching users." });
    }
  }
    async getDataId(req, res) {
      try {
        const id = req.params.id;
        const response = await Register.findById(id);
        if (!response) {
          return res.status(404).json({ msg: "Data not found." });
        }
        res.status(200).json({ List: response });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to fetch data by id." });
      }
    }
  
    async Put(req, res) {
      try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ msg: "ID missing." });
        const updatedData = req.body;
        const response = await Register.findByIdAndUpdate(id, updatedData, { new: true });
        if (!response) return res.status(404).json({ msg: "Data not found to update." });
        res.status(200).json({
          msg: "Data updated successfully.",
          Data: response,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to update data." });
      }
    }
  
    async Delete(req, res) {
      try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ msg: "ID missing." });
        const response = await Register.findByIdAndDelete(id);
        if (!response) return res.status(404).json({ msg: "Data not found to delete." });
        res.status(200).json({ msg: "Data deleted successfully." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to delete data." });
      }
    }
}

module.exports = RegisterController;
