const mongoose = require("mongoose");
const invoiceSchema = new mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  courseName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
    length: 6,
  },
  courseId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "course",
    required : true
  },
});

module.exports = mongoose.model("invoice", invoiceSchema);
