const { default: mongoose } = require("mongoose");


const AddProductTbl= new mongoose.Schema({
  BrandName:{
        type:String
    },
    ProductName:{
        type:String
    },
     ExtraField1:{
        type:String
    },
     ExtraField2:{
        type:String
    },
     ExtraField3:{
        type:String
    },
     ExtraField4:{
        type:String
    },
     Status:{
        type:String
    },
       userId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "User2", 
                required: true 
              }, 
})
module.exports=mongoose.model("ProductTbl",AddProductTbl)