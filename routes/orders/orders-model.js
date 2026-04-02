const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const ordersSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productFromCartId: {
          type: ObjectId,
          ref: "ShopingCart",
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
