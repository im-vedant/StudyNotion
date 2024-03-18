const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true, 
  },
  courseDescription: {
    type: String,
    required: true,
  },
  instructor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  WhatWillYouLearn: {
    type: String,
    required: true,
  },
  courseContent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "section",
  }],
  ratingAndReviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ratingAndReviews",
  }],
  price: {
    type: Number,
    required: true,
  },
  tag:{
    type:[String],
    required : true,
  },
  thumbnail :{
    type : String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  studentsEnrolled:[{
    type: mongoose.Schema.Types.ObjectId,
    ref : "user",
  }],
  instructions :{
    type : [String]
  },
  status :{
    type : String,
    enum :['Draft','Published'],
    default :'Draft'
  },
  createdAt :{
    type : Date,
    default : Date.now()
  },
  sold :{
    type : Number,
    default : 0
  }
})

module.exports = mongoose.model("course", courseSchema);
