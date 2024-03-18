const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  about: {
    type: String,
  },
  contactNumber: {
    type: Number,
   length : 10,
    trim : true
  },
  countryCode :{
    type :String,
  }
});

module.exports = mongoose.model("profile", profileSchema);
