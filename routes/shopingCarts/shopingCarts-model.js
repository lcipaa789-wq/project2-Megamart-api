const mongoose = require("mongoose");

const ObjectID = mongoose.Schema.Types.ObjectId;

const shopingCartSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectID,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        productId: {
          type: ObjectID,
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
