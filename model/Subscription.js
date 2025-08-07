const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },  // ✅ Link to user
 // Optional (for display/search)
  Name: { 
    type: String, 
    required: true 
  },
  startDate: { 
    type: String, 
    required: true 
  },
  duration: { 
    type: String, 
    required: true 
  },
  expiryDate: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    default: "active" 
  },
  addUser: { 
    type: Number, 
    default: 0 
  },
  supportPerson: { 
    type: Number, 
    default: 0 
  },
  technicalPerson: { 
    type: Number, 
    default: 0 
  }
});

module.exports = mongoose.model("Subscription", subscriptionSchema);