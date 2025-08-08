// const { type } = require("@testing-library/user-event/dist/type");
const { default: mongoose } = require("mongoose");


const AddAreaTBL= new mongoose.Schema({

    Name:{
        type:String

    },
     Status:{
        type:String
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User2", 
        required: true 
      },  // ✅ Link to user
     // Optional (for dis

   
})
module.exports=mongoose.model("AddArea",AddAreaTBL)