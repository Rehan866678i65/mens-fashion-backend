
const AddArea = require('../model/AddArea');
class AddAreaController{


     async insertData(req, res) {
    try {
      const body = req.body;
      const reg = new AddArea(body);
      const response = await reg.save();
      res.status(200).json({
        msg: "Successfully Stored.",
        List: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Something wrong in database." });
    }
  }

  
  async getData(req, res) {
    const userId=req.params.userId
    console.log("papath oarams",userId)
    try {
      const response = await AddArea.find({userId:userId});
      res.status(200).json({
        List: response,
        msg: "Data fetched successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Failed to fetch data." });
    }
  }

  async getDataId(req, res) {
    try {
      const id = req.params.id;
      const response = await AddArea.findById(id);
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
      const response = await AddArea.findByIdAndUpdate(id, updatedData, { new: true });
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
      const response = await AddArea.findByIdAndDelete(id);
      if (!response) return res.status(404).json({ msg: "Data not found to delete." });
      res.status(200).json({ msg: "Data deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Failed to delete data." });
    }
  }


   // Controller method:
  async AddAreaNameid(req, res) {
    try {
      var obj = req.params.Name;
      AddArea.find({
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
module.exports = AddAreaController;