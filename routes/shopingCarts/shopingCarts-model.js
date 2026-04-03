const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const shopingCartSchema = new mongoose.Schema(
  {
    user: {
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
  },
  {
    timestamps: true,
  },
);
const ShopingCart = mongoose.model("ShopingCart", shopingCartSchema);
module.exports = ShopingCart;
