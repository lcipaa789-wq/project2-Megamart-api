const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewShema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: ObjectId,
    ref: "Product",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
});
const Review = mongoose.model("Review", reviewShema);
module.exports = Review;
