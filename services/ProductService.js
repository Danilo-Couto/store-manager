// const JOI = require('joi');
const ProductModel = require('../models/ProductModel');

const invalidData = { error: { code: 'invalidData', message: 'Product not found' } }; // estava sale not found
const alreadyExists = { error: { code: 'alreadyExists', message: 'Product already exists' } }; // inclui

const getAll = async () => ProductModel.getAll();

const getById = async (id) => {
  const product = await ProductModel.getById(id);
  if (!product) return invalidData;

  return product;
};

const postProduct = async (name, quantity) => {
  const existingProduct = await ProductModel.getByName(name);
  if (existingProduct) return alreadyExists;

  return ProductModel.postProduct(name, quantity);
};

const putProduct = async (id, name, quantity) => {

 const findProduct = await getById(id);
 if (findProduct.error) return findProduct;

 const editedProduct = await ProductModel.putProduct(id, name, quantity);
 return editedProduct;
};

const deleteProduct = async (id) => {
  const existingProduct = await getById(id);
  if (existingProduct.error) return existingProduct;

  const deletedProduct = ProductModel.deleteProduct(id);
  return deletedProduct;
};

module.exports = {
  getAll,
  getById,
  postProduct,
  putProduct,
  deleteProduct,
};
