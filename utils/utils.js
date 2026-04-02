//total price

const calculateCartTotalPrice = (items) => {
  return items.reduce((sum, item) => {
    return sum + item.productId.price * item.quantity;
  }, 0);
};
module.exports = calculateCartTotalPrice;
