// const { type } = require("@testing-library/user-event/dist/type");
const { default: mongoose } = require("mongoose");


const TicketTbl = new mongoose.Schema({

    FirstName: {
        type: String
    },
    MiddleName: {
        type: String
    },
    DealerName:{
            type: String 
    },
    LastName: {
        type: String
    },
    Email: {
        type: String
    },
    MobileNo: {
        type: String
    },
     ComplainNo: {
        type: String
    },
        Description: {
        type: String
    },
        AlternateNo: {
        type: String
    },

     userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User2", 
            required: true 
          },  // ✅ Link to user
         // Optional (for dis

    Brand: {
        type: String
    },
    BrandCall: {
        type: String
    },
    Product: {
        type: String
    },
    Model: {
        type: String
    },

    Address1: {
        type: String
    },
    Address2: {
        type: String
    },
    Address3: {
        type: String
    },
    City: {
        type: String
    },

    Pincode: {
        type: String
    },

    Area: {
        type: String
    },
    Category: {
        type: String
    },
    Warranty: {
        type: String
    },

    Charge1: {
        type: String
    },

    Charge2: {
        type: String
    },
    Charge3: {
        type: String
    },


    Technician: {
        type: String
    },





    ExtraField1: {
        type: String
    },
    ExtraField2: {
        type: String
    },
    ExtraField3: {
        type: String
    },
    ExtraField4: {
        type: String
    },
    Status: {
        type: String
    },


})
module.exports = mongoose.model("Ticket", TicketTbl)