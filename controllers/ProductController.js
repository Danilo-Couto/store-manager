const ProductService = require('../services/ProductService');
const ProductModel = require('../models/ProductModel');

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

const putProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  // const findProduct = await ProductService.getById(id);
  // if (findProduct.error) return next(findProduct.error);

  const editedProduct = await ProductService.putProduct(id, name, quantity);
  console.log('controller/ produto atualizado:', editedProduct);
  if (editedProduct.error) return next(editedProduct.error);

  return res.status(200).json(editedProduct);
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const findProduct = await ProductService.getById(id);

  if (findProduct.error) return next(findProduct.error);

  await ProductModel.deleteProduct(id);

  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  postProduct,
  putProduct,
  deleteProduct,
};
