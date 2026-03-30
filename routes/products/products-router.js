const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./products-controller");
const router = express.Router();

//create new customer
router.post("/", async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.json({
      message: "success",
      payload: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
//get product
router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json({
      message: "failure",
      payload: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
//get by id
router.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.json({
      message: "success",
      payload: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
//put
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    res.json({
      message: "success",
      payload: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      payload: error.message,
    });
  }
});
//delete product
router.delete("/:id", async (req, res) => {
  try {
    const productToDelete = await deleteProduct(req.params.id);
    res.json({
      message: "success",
      payload: `${productToDelete} has been removed from database!`,
    });
  } catch (error) {
    res.status(404).json({
      message: "failure",
      payload: error.message,
    });
  }
});
module.exports = router;
