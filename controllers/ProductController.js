// const JOI = require('joi');
const ProductService = require('../services/ProductService');

const getAll = async (_req, res) => {
    const products = await ProductService.getAll();
    return res.status(200).json(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductService.getById(id);

  if (product.error) return next(product.error);

  return res.status(200).json(product);
};

const postProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const newProduct = await ProductService.postProduct(name, quantity);

  if (newProduct.error) return next(newProduct.error);

  return res.status(201).json(newProduct);
};

module.exports = {
  getAll,
  getById,
  postProduct,
};
