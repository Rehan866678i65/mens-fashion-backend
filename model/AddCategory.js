const { default: mongoose } = require("mongoose");


const AddCaregoryTbl= new mongoose.Schema({
  Name:{
        type:String
    },
    Status:{
        type:String
    }
  
})
module.exports=mongoose.model("Category",AddCaregoryTbl)