const { ProductRepository } = require("../database");
const { FormatData } = require("../utils");
const { APIError } = require("../utils/app-errors");

// All Business logic will be here
class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  // * create
  async CreateProduct(productInputs) {
    try {
      const productResult = await this.repository.CreateProduct(productInputs);
      return FormatData(productResult);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async DeleteProduct(productId) {
    const product = await this.repository.FindById(productId);

    try {
      if (product) {
        const productResult = await this.repository.DeleteProduct(productId);
        return FormatData(productResult);
      } else {
        return FormatData({ msg: "Product id not matches!" });
      }
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  // * get all
  async GetProducts() {
    try {
      const products = await this.repository.Products();

      let categories = [];

      products.map(({ type }) => {
        categories[type] = type;
      });

      return FormatData({
        products,
        categories: Object.keys(categories),
      });

    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetProductDescription(productId) {
    try {
      const product = await this.repository.FindById(productId);
      if (product) {
        return FormatData(product);
      }
      return FormatData({ msg: "Product not found!" });
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetProductsByCategory(category) {
    try {
      const products = await this.repository.FindByCategory(category);
      return FormatData(products);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetSelectedProducts(selectedIds) {
    try {
      const products = await this.repository.FindSelectedProducts(selectedIds);
      return FormatData(products);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetProductById(productId) {
    try {
      return await this.repository.FindById(productId);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetProductPayload(userId, { productId, qty }, event) {
    const product = await this.repository.FindById(productId);

    if (product) {
      const payload = {
        event: event,
        data: { userId, product, qty },
      };
      return FormatData(payload);
    } else {
      return FormatData({ error: "No product available" });
    }
  }
}

module.exports = ProductService;
