// const { formatCep } = require('../3.middlewares/validations');
// const JOI = require('joi');
const ProductModel = require('../models/ProductModel');

const getAll = async () => ProductModel.getAll();

const getById = async (id) => {
  const product = await ProductModel.getById(id);

  if (!product) {
  return {
    error: { code: 'invalidData', message: 'Product not found' } };
  }
  return product;
};

module.exports = {
  getAll,
  getById,
};
