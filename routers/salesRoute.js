const express = require('express');

const router = express.Router();
const rescue = require('express-rescue');
const SalesRoute = require('../controllers/SalesController');

router
.get('/', rescue(SalesRoute.getAll))
.get('/:saleId', rescue(SalesRoute.getById))
.post('/', rescue(SalesRoute.postSale))
.put('/:saleId', rescue(SalesRoute.putSale))
.delete('/:saleId', rescue(SalesRoute.putSale));

module.exports = router;
