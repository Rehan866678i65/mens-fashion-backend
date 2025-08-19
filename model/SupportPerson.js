// const { type } = require("@testing-library/user-event/dist/type");
const { default: mongoose } = require("mongoose");


const SupportPersonTBL= new mongoose.Schema({

    FirstName:{
        type:String
    },
    MiddleName:{
        type:String
    },
     LastName:{
        type:String
    },
     Email:{
        type:String
    },
     MobileNo:{
        type:String
    },
     Password:{
        type:String
    },
  userId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User", 
          required: true 
        },  // 

     ConfirmPassword:{
        type:String
    },
    Address1:{
        type:String
    },
     Address2:{
        type:String
    },
     Address3:{
        type:String
    },
     City:{
        type:String
    },
     Pincode:{
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
module.exports=mongoose.model("SupportPerson",SupportPersonTBL)