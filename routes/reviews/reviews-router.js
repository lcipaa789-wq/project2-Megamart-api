const express = require("express");
const createReview = require("./reviews-controller");
const router = express.Router();

//post - create
router.post("/", async (req, res) => {
  try {
    const review = await createReview(req.body);
    res.json({
      message: "success",
      payload: review,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
module.exports = router;
