// const { type } = require("@testing-library/user-event/dist/type");
const { default: mongoose } = require("mongoose");


const SavedModelsTbl= new mongoose.Schema({

    BrandName:{
        type:String
    },

     ProductName:{
        type:String
    },

     ModelNoName:{
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

   
})
module.exports=mongoose.model("SavedModel",SavedModelsTbl)