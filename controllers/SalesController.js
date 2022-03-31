const SalesService = require('../services/SalesService');
const SalesModel = require('../models/SalesModel');

const getAll = async (_req, res) => {
    const sales = await SalesService.getAll();
    return res.status(200).json(sales);
};

const getById = async (req, res, next) => {
  const { saleId } = req.params;
  const sale = await SalesService.getById(saleId);

  if (sale.error) return next(sale.error);

  return res.status(200).json(sale);
};

const postSale = async (req, res, next) => {
  const newSale = await SalesService.postSale(req.body);

  if (newSale.hasError) return next(newSale.hasError);

  return res.status(201).json(newSale);
};

const putSale = async (req, res, next) => {
  const { saleId } = req.params;
  const [{ productId, quantity }] = req.body;

  const findSale = await SalesService.getById(saleId);

  if (findSale.error) return next(findSale.error);

  const editedSale = await SalesModel.putSale(saleId, productId, quantity);

  return res.status(200).json(editedSale);
  };

module.exports = {
  getAll,
  getById,
  postSale,
  putSale,
};
