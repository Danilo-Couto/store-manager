// const JOI = require('joi');
const SalesService = require('../services/SalesService');

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

  if (newSale.temErro) return next(newSale.temErro);

  return res.status(201).json(newSale);
};

/* const postSale = async (req, res, next) => {
  const [...sales] = req.body;

  const saleMap = sales.map((e) => ({
    productId: e.productId,
    quantity: e.quantity,
  }));

  const newSale = await SalesService.postSale(saleMap);

  if (newSale.error) return next(newSale.error);

  return res.status(201).json(newSale);
}; */

module.exports = {
  getAll,
  getById,
  postSale,
};