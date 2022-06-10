const { ProductModel, RatingModel } = require("../models");
const { APIError, BadRequestError } = require("../../utils/app-errors");

//Dealing with data base operations
class ProductRepository {
  // * create
  async CreateProduct({
    name,
    type,
    description,
    price,
    stockNo,
    imageUrl,
    available,
    storeId,
  }) {
    try {
      const product = new ProductModel({
        name,
        type,
        description,
        price,
        stockNo,
        imageUrl,
        available,
        storeId,
      });
      const productResult = await product.save();
      return productResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Product"
      );
    }
  }

  // * delete
  async DeleteProduct(productId) {
    try {
      const deletedProduct = await ProductModel.deleteOne({ _id: productId });
      return deletedProduct;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Product"
      );
    }
  }

  // * get all
  async Products() {
    try {
      const products = await ProductModel.find().populate("ratingId");

      return products;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Products"
      );
    }
  }

  // * get by id
  async FindById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Product"
      );
    }
  }

  // * get by category
  async FindByCategory(category) {
    try {
      const products = await ProductModel.find({ type: category });
      return products;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Category"
      );
    }
  }

  // * get selected product
  async FindSelectedProducts(selectedIds) {
    try {
      const products = await ProductModel.find()
        .where("_id")
        .in(selectedIds.map((_id) => _id))
        .exec();
      return products;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Product"
      );
    }
  }
}

module.exports = ProductRepository;
