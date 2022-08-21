const JOI = require('joi');
const SalesModel = require('../models/SalesModel');
const ProductModel = require('../models/ProductModel');

const invalidData = { error: { code: 'invalidData', message: 'Sale not found' } };

const getAll = async () => SalesModel.getAll();

const getById = async (saleId) => {
  const sale = await SalesModel.getById(saleId);
  if (!sale) return invalidData;
  return sale;
};

const productsInStock = async (productId) => {
  const productObj = await ProductModel.getById(productId);
  return productObj.quantity;
};

const stockValidation = async (productId) => {
  const max = await productsInStock(productId);
  const constante = JOI.object({
     quantity: JOI.number()
    .max(max)
    .messages({
      'number.max': 'Such amount is not permitted to sell',
    }),
  });
  return constante;
};

const postSale = async (body) => {
  let hasError = null;

  await Promise.all(body.map(async ({ productId, quantity }) => {
    const schema = await stockValidation(productId);
    const { error } = schema.validate({ quantity });

    if (error) hasError = error;
  }));
  if (hasError) return { hasError };

  return SalesModel.postSale(body);
 // ajuda do Orlando Dantas
};

const putSale = async (saleId, body) => {
  const findSale = await getById(saleId);
  if (findSale.error) return findSale;
  return SalesModel.putSale(saleId, body);
    // ajuda do Paulo Sordi
};

const deleteSale = async (saleId) => {
  const existingSale = await getById(saleId);
  if (existingSale.error) return existingSale.error;

  const deletedSale = await SalesModel.deleteSale(saleId);
  return deletedSale;
};

module.exports = {
  getAll,
  getById,
  postSale,
  putSale,
  deleteSale,
};
