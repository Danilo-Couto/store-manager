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

module.exports = {
  getAll,
  getById,
};
