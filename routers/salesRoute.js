const express = require('express');

const router = express.Router();
const rescue = require('express-rescue');
const SalesRoute = require('../controllers/SalesController');
const { idValidation, createSaleValidation,
  } = require('../middlewares/validators');

router
.get('/:id', idValidation, rescue(SalesRoute.getById))
.put('/:id', idValidation, createSaleValidation, rescue(SalesRoute.putSale))
.delete('/:id', idValidation, rescue(SalesRoute.deleteSale))
.get('/', rescue(SalesRoute.getAll))
.post('/', createSaleValidation, rescue(SalesRoute.postSale));

module.exports = router;
