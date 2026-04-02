const Order = require("./orders-model");
const ShopingCart = require("../shopingCarts/shopingCarts-model");
const calculateCartTotalPrice = require("../../utils/utils");
const { getProductById } = require("../products/products-controller");
//placing an order from a cart

const createOrderFromCart = async (userId) => {
  try {
    //cart items
    const cart = await ShopingCart.findOne({ user: userId }).populate(
      "items.productId",
    );
    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }
    //update available products
    for (const item of cart.items) {
      const product = item.productId;
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product._id}`);
      }
      product.stock -= item.quantity;
      await product.save();
    }

    const totalPrice = calculateCartTotalPrice(cart.items);
    const order = await Order.create({
      user: userId,
      items: cart.items.map((item) => ({
        productFromCartId: item.productId._id,
        quantity: item.quantity,
      })),
      totalPrice,
      status: "pending",
    });
    cart.items = [];
    await cart.save();
    return order;
  } catch (error) {
    throw error;
  }
};
// get users orders
const getAllOrders = async () => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createOrderFromCart,
  getAllOrders,
};
