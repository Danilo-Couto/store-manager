const JOI = require('joi');

const idValidate = JOI.object({
  id: JOI.number().integer().required(),
});

const idValidation = (req, _res, next) => {
  const id = req.params;
  const { error } = idValidate.validate(id);
  if (error) throw error;
  next();
};

const scheme = JOI.object({
  name: JOI.string().min(5).not().empty()
  .required(),
  quantity: JOI.number().min(1).integer().not()
  .empty()
  .required(),
});

const createProductValidation = (req, _res, next) => {
  const { name, quantity } = req.body;
  const { error } = scheme.validate({ name, quantity });
  if (error) throw error;
  next();
};

const editProductValidation = (req, _res, next) => {
  const { name, quantity } = req.body;
  const { error } = scheme.validate({ name, quantity });

  if (error) throw error;
  next();
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

const createSaleValidation = (req, _res, next) => {
  const { body } = req;

  let hasError = null;

  Promise.all(body.map(({ productId, quantity }) => {
    // const schema = await saleValidation(productId);
    const { error } = erro.validate({ productId, quantity });
    if (error) hasError = error;
  }));
  if (hasError) throw hasError;

 next();
};

module.exports = {
  idValidation,
  createProductValidation,
  editProductValidation,
  createSaleValidation,
};
