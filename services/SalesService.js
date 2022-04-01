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

const postSale = async (body) => {
  let hasError = null;

  body.forEach(({ productId, quantity }) => {
    const { error } = erro.validate({ productId, quantity });
    if (error) hasError = error;
});
  if (hasError) return { hasError };

  return SalesModel.postSale(body);
 // ajuda do Orlando Dantas
};

const putSale = async (saleId, body) => {
  const { error } = erro.validate(body);
  if (error) return { error };

  return SalesModel.putSale(saleId, body);
    // ajuda do Paulo Sordi
};

const deleteSale = async (saleId) => {
  const existingSale = await getById(saleId); // procura o paramentro

  console.log('existingSale:', existingSale);
  if (existingSale.error) return existingSale.error;

  await SalesModel.deleteSale(saleId);
};

module.exports = {
  getAll,
  getById,
  postSale,
  putSale,
  deleteSale,
};
