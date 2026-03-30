const mongoose = require("mongoose");

const User = require("../users/users-model");
const ShopingCart = require("../shopingCarts/shopingCarts-model");
const Product = require("../products/products-model");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ordersSchema = new mongoose.Schema(
  {
    customer: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "shiped", "delivered", "cancelled"],
    },
  },
  {
    timestamps: true,
  },
);
const Order = mongoose.model("Order", ordersSchema);
module.exports = Order;
