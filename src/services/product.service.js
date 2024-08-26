'use strict';

const { BadRequestError } = require('../core/error.response');

const { Clothing, Electronic, Furniture } = require('./product');
const {
  queryProduct,
  publishProductForShop,
  unPublishProductForShop,
  searchProductByUser,
} = require('../models/repositories/product.repo');

// Factory pattern
class ProductFactory {
  static productRegistry = {};

  static registerProductType = (type, classRef) => {
    ProductFactory.productRegistry[type] = classRef;
  };

  static createProduct = async (type, payload) => {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) {
      throw new BadRequestError(`Invalid Product Type:: ${type}`);
    }
    return new productClass(payload).createProduct();
  };

  // Query
  static findDraftsInShop = async ({ product_shop, limit = 50, page = 1 }) => {
    const query = { product_shop, isDraft: true };
    return await queryProduct({ query, limit, page });
  };

  static findPublishInShop = async ({ product_shop, limit = 50, page = 1 }) => {
    const query = { product_shop, isPublished: true };
    return await queryProduct({ query, limit, page });
  };
  // End Query

  // Modify
  static publishProductForShop = async ({ product_shop, product_id }) => {
    return await publishProductForShop({ product_shop, product_id });
  };

  static unPublishProductForShop = async ({ product_shop, product_id }) => {
    return await unPublishProductForShop({ product_shop, product_id });
  };
  // End Modify

  static searchProduct = async ({ keySearch }) => {
    return await searchProductByUser({ keySearch });
  };
}

// Register product type
ProductFactory.registerProductType('Clothing', Clothing);
ProductFactory.registerProductType('Electronic', Electronic);
ProductFactory.registerProductType('Furniture', Furniture);

module.exports = ProductFactory;
