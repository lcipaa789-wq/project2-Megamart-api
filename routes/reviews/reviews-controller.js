const ShopingCart = require("../shopingCarts/shopingCarts-model");
const Review = require("./reviews-model");

//crete review
const createReview = async (reviewsData) => {
  try {
    const review = await Review.create(reviewsData);
    return review;
  } catch (error) {
    throw error;
  }
};

module.exports = createReview;
