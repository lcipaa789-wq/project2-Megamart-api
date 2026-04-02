const express = require("express");
const {
  createOrderFromCart,
  getAllOrders,
  updateOrderStatus,
} = require("./orders-controller");
const router = express.Router();

//create new order
router.post("/", async (req, res) => {
  try {
    const { user } = req.body;
    const newOrder = await createOrderFromCart(user);
    res.json({
      message: "success",
      payload: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
//get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await getAllOrders(req.query);
    res.json({
      message: "success",
      payload: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
router.patch("/:orderId/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await updateOrderStatus(req.params.orderId, status);
    res.json({
      message: "success",
      payload: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
module.exports = router;
