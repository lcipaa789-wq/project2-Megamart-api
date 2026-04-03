const Product = require("./products-model");

const createProduct = async (productData) => {
  try {
    const newProduct = await Product.create(productData);
    return newProduct;
  } catch (error) {
    throw error;
  }
};

const getAllProducts = async (queryData) => {
  try {
    //filtering
    //
    //categoty
    const filterObject = {};
    if (queryData.category) {
      filterObject.category = queryData.category;
    }
    //price
    filterObject.price = {
      $gte: queryData.minPrice || 0,
      $lte: queryData.maxPrice || Infinity,
    };
    //in-stock
    if (queryData.inStock === true) {
      filterObject.stock = { $gt: 0 };
    }
    //sort
    const sortObject = {};
    sortObject[queryData.sortby || "_id"] =
      queryData.sortOrder || "asc" ? -1 : 1;
    //pagination
    const page = Number(queryData.page) || 1;
    const limit = Number(queryData.limit) || 10;
    const skip = (page - 1) * limit;

    const product = await Product.find(filterObject)
      .sort(sortObject)
      .skip(skip)
      .limit(limit);
    return product;
  } catch (error) {
    throw error;
  }
};
const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw "Product not found";
    }
    return product;
  } catch (error) {
    throw error;
  }
};
const updateProduct = async (productId, productData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      productData,
      {
        new: true,
      },
    );
    if (!updatedProduct) {
      throw "Product not found";
    }
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};
const deleteProduct = async (productId) => {
  try {
    const productToDelete = await Product.findByIdAndDelete(productId);
    if (!productToDelete) {
      throw "Product to delete not found";
    }
    return productToDelete;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
