const ShopingCart = require("./shopingCarts-model");
const createShopingCart = async (shopingCartsData) => {
  const shopingCart = await ShopingCart.create(shopingCartsData);
  return shopingCart;
};

//
//add item to cart
const addProductToShopingCart = async (userId, productId, quantity) => {
  try {
    let cart = await ShopingCart.findOne({ user: userId }); //found cart
    if (!cart) {
      cart = await ShopingCart.create({
        user: userId,
        items: [{ productId, quantity }],
      });
      return cart;
    }
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId,
    );
    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
};

module.exports = { createShopingCart, addProductToShopingCart };
