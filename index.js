const express = require("express");
const logger = require("morgan");

const connectToMongoDB = require("./database/connectToMongoDB");
const app = express();

app.use(logger("dev"));
app.use(express.json());

//routers
const usersRouter = require("./routes/users/users-router");
app.use("/api/v1/users", usersRouter);
const ordersRouter = require("./routes/orders/orders-router");
app.use("/api/v1/orders", ordersRouter);
const productsRouter = require("./routes/products/products-router");
app.use("/api/v1/products", productsRouter);
const shopingCartsRouter = require("./routes/shopingCarts/shopingCarts-router");
app.use("/api/v1/shopingCarts", shopingCartsRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
  connectToMongoDB();
});
