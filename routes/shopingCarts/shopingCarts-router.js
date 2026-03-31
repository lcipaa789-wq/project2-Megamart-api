const express = require("express");
const {
  createShopingCart,
  addProductToShopingCart,
  deleteItemFromCart,
} = require("./shopingCarts-controller");
const router = express.Router();

//create
router.post("/", async (req, res) => {
  try {
    const newShopingCart = await createShopingCart(req.body);
    res.json({
      message: "success",
      payload: newShopingCart,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
//add item to cart
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await addProductToShopingCart(userId, productId, quantity);
    res.json({
      message: "success",
      payload: cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
//remove item
router.post("/removeProduct", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const deleteItem = await deleteItemFromCart(userId, productId);
    res.json({
      message: "success",
      payload: deleteItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
module.exports = router;
