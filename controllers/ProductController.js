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

module.exports = {
  getAll,
  getById,
};
