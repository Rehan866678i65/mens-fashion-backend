

// controllers/RegisterController.js
// const bcrypt = require("bcryptjs");
const Register = require("../model/Register");
// const Registertbl = require('../model/Register'); // mongoose model

class RegisterController {
  // Create new user account
async insertData(req, res) {
  try {
    const {
      Nema,
      email,
 
      mobile,
      password,
      taluka,
      alternateMobile,
      role,
      userId,
      addressLine1,
      addressLine2,
      sparePartAllowed,
      photos // This should be an array of image URLs or filenames
    } = req.body;

    const reg = new Register({
      Nema,
      email,
      userId,
      mobile,
      password,
      Taluka: taluka,
      Alternate: alternateMobile,
      role: Array.isArray(role) ? role : [role], // Ensure it's always an array
      addressLine1,
      addressLine2,
      sparePartAllowed: sparePartAllowed === true || sparePartAllowed === "true", // accept string or boolean
      photos: Array.isArray(photos) ? photos : [], // ensure array
    });

    const response = await reg.save();

    res.status(200).json({
      msg: "Successfully Stored.",
      List: response,
    });
  } catch (err) {
    console.error("Insert error:", err);
    return res.status(500).json({
      error: "Internal server error.",
      details: err.message,
    });
  }
}



   async getAllUsers(req, res) {
    try {
      const userId=req.query.userId
      const users = await Register.find({userId : userId}); // MongoDBમાંથી બધાં users લાવો
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

  // ✅ Search by Name (Only ID + Name)
  async RegisterNameid(req, res) {
    try {
      const obj = req.params.Nema;
      console.log("Searching user with name:", obj);

      const response = await Register.find(
        { Nema: { $regex: obj, $options: "i" } }, // ✅ Partial search
        "_id Nema"
      );

      if (response.length > 0) {
        return res.status(200).json({ msg: "Successfully fetched", users: response });
      } else {
        return res.status(404).json({ msg: "No data found" });
      }

    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Something went wrong while fetching data", err: error.message });
    }
  }
}

module.exports = RegisterController;
