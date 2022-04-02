const express = require('express');

const router = express.Router();
const rescue = require('express-rescue');
const SalesRoute = require('../controllers/SalesController');

router
.get('/:saleId', rescue(SalesRoute.getById))
.put('/:saleId', rescue(SalesRoute.putSale))
.delete('/:saleId', rescue(SalesRoute.deleteSale))
.get('/', rescue(SalesRoute.getAll))
.post('/', rescue(SalesRoute.postSale));

module.exports = router;
