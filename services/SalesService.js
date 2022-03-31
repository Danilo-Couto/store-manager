const JOI = require('joi');
const SalesModel = require('../models/SalesModel');

const getAll = async () => SalesModel.getAll();

const getById = async (saleId) => {
  const sale = await SalesModel.getById(saleId);

  if (!sale) {
  return {
    error: { code: 'invalidData', message: 'Sale not found' } };
  }
  return sale;
};

const erro = JOI.object({
  productId: JOI.number().integer().not()
  .empty()
  .min(1)
  .required(),
  quantity: JOI.number().integer().not()
  .empty()
  .min(1)
  .required(),
});

const postSale = (soldItems) => {
  let temErro = null;
  soldItems.forEach(({ productId, quantity }) => {
    const { error } = erro.validate({ productId, quantity });
    if (error) temErro = error;
});
  if (temErro) return { temErro };

 return SalesModel.postSale(soldItems);
};

module.exports = {
  getAll,
  getById,
  postSale,
};
