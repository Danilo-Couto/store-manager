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
  let hasError = null;
  soldItems.forEach(({ productId, quantity }) => {
    const { error } = erro.validate({ productId, quantity });
    if (error) hasError = error;
});
  if (hasError) return { hasError };

 return SalesModel.postSale(soldItems);
 // ajuda do Orlando Dantas
};

const putSale = async (body) => {
  console.log('service:', body);

  const { error } = erro.validate(body);
  if (error) return error;
  // ajuda do Paulo Sordi
};

module.exports = {
  getAll,
  getById,
  postSale,
  putSale,
};
