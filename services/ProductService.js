const JOI = require('joi');
const ProductModel = require('../models/ProductModel');

const invalidData = { error: { code: 'invalidData', message: 'Sale not found' } };

const getAll = async () => ProductModel.getAll();

const getById = async (id) => {
  if (!id) return invalidData;

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

const putProduct = (id, name, quantity) => {
  if (!id) return invalidData;

  const { error } = JOI.object({
     name: JOI.string().min(5).not().empty()
       .required(),
     quantity: JOI.number().integer().min(1).not()
       .empty()
       .required(),
 }).validate({ name, quantity });
 if (error) return ({ error });

 return ProductModel.putProduct(id, name, quantity);
};

const deleteProduct = async (id) => {
  if (!id) return invalidData;

  const existingProduct = await getById(id);

  if (existingProduct.error) return existingProduct;

  await ProductModel.deleteProduct(id);
};

module.exports = {
  getAll,
  getById,
  postProduct,
  putProduct,
  deleteProduct,
};
