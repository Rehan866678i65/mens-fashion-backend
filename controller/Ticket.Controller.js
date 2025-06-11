
const TicketTbl = require('../model/Ticket');
class TicketController{


     async insertData(req, res) {
    try {
      const body = req.body;
      const reg = new TicketTbl(body);
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
    try {
      const response = await TicketTbl.find();
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
      const response = await TicketTbl.findById(id);
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
      const response = await TicketTbl.findByIdAndUpdate(id, updatedData, { new: true });
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
      const response = await TicketTbl.findByIdAndDelete(id);
      if (!response) return res.status(404).json({ msg: "Data not found to delete." });
      res.status(200).json({ msg: "Data deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Failed to delete data." });
    }
  }
}
module.exports = TicketController;