const JOI = require('joi');
const ProductModel = require('../models/ProductModel');

const invalidData = { error: { code: 'invalidData', message: 'Product not found' } }; // estava sale not found
const alreadyExists = { error: { code: 'alreadyExists', message: 'Product already exists' } }; // inclui

const getAll = async () => ProductModel.getAll();

const getById = async (id) => {
  if (!id) return invalidData;

  const product = await ProductModel.getById(id);
  if (!product) return invalidData; // mudei aqui

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

  if (existingProduct) return alreadyExists; // mudei aqui

  return ProductModel.postProduct(name, quantity);
};

const putProduct = async (id, name, quantity) => {
  const { error } = JOI.object({
    id: JOI.number().integer().min(1).not()
    .empty()
    .required(),
     name: JOI.string().min(5).not().empty()
       .required(),
     quantity: JOI.number().integer().min(1).not()
       .empty()
       .required(),
 }).validate({ id, name, quantity });

 if (error) return ({ error });

 const findProduct = await getById(id);
 if (findProduct.error) return findProduct;

 const editedProduct = await ProductModel.putProduct(id, name, quantity);
 return editedProduct;
};

const deleteProduct = async (id) => {
  if (!id) return invalidData;

  const existingProduct = await getById(id);

  if (existingProduct.error) return existingProduct;

  const deletedProduct = ProductModel.deleteProduct(id); // mudei aqui

  return deletedProduct;
};

module.exports = {
  getAll,
  getById,
  postProduct,
  putProduct,
  deleteProduct,
};
