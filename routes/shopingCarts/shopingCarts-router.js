const express = require("express");
const {
  createShopingCart,
  addProductToShopingCart,
  deleteItemFromCart,
  cleaningCart,
  getShopingCartById,
} = require("./shopingCarts-controller");
const router = express.Router();
//get
router.get("/:id", async (req, res) => {
  try {
    const cart = await getShopingCartById(req.params.id);
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
router.post("/:userId/add/:productId", async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await addProductToShopingCart(
      req.params.userId,
      req.params.productId,
      quantity,
    );
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
//remove one item from cart
router.delete("/:userId/remove/:productId", async (req, res) => {
  try {
    const cart = await deleteItemFromCart(
      req.params.userId,
      req.params.productId,
    );
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
//clear cart
router.delete("/:userId/items", async (req, res) => {
  try {
    const cart = await cleaningCart(req.params.userId);
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
module.exports = router;
