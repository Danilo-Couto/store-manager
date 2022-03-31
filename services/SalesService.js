// const JOI = require('joi');
const SalesModel = require('../models/SalesModel');

const getAll = async () => SalesModel.getAll();

const getById = async (saleId) => {
  const sale = await SalesModel.getById(saleId);
  console.log(sale);

  if (!sale) {
  return {
    error: { code: 'invalidData', message: 'Sale not found' } };
  }
  return sale;
};

module.exports = {
  getAll,
  getById,
};
