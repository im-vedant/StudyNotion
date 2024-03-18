const mongoose = require("mongoose");
const ratingAndReviewsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "user",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required : true
  },
  course :{
    type : mongoose.Schema.Types.ObjectId,
    ref :"course",
    required : true
  }
});

module.exports = mongoose.model("ratingAndReviews", ratingAndReviewsSchema);
