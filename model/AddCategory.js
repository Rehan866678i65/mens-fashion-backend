const { default: mongoose } = require("mongoose");


const AddCaregoryTbl= new mongoose.Schema({
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
        },  // 
  
})
module.exports=mongoose.model("Category",AddCaregoryTbl)