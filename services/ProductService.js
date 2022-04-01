const JOI = require('joi');
const ProductModel = require('../models/ProductModel');

const getAll = async () => ProductModel.getAll();

const getById = async (id) => {
  const product = await ProductModel.getById(id);
  if (!product) {
  return {
    error: { code: 'invalidData', message: 'Product not found' } };
  }
  return product;
};

const postProduct = async (name, quantity) => {
   const { error } = JOI.object({
      name: JOI.string().min(5).not().empty()
        .required(),
      quantity: JOI.number().min(1).integer().not()
        .empty()
        .required(),
  }).validate({ name, quantity });
  if (error) return ({ error });

  const existingProduct = await ProductModel.getByName(name);
  if (existingProduct) {
 return ({ error: {
      code: 'alreadyExists', message: 'Product already exists',
    } });
}
  return ProductModel.postProduct(name, quantity);
};

const deleteProduct = async (id) => {
  const existingProduct = await getById(id);

  if (existingProduct.error) return existingProduct;

  await ProductModel.deleteProduct(id);
};

module.exports = {
  getAll,
  getById,
  postProduct,
  deleteProduct,
};
