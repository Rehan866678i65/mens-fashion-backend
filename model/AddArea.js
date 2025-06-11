// const { type } = require("@testing-library/user-event/dist/type");
const { default: mongoose } = require("mongoose");


const AddAreaTBL= new mongoose.Schema({

    Name:{
        type:String
    },
     Status:{
        type:String
    },

   
})
module.exports=mongoose.model("AddArea",AddAreaTBL)