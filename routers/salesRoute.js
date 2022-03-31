const express = require('express');

const router = express.Router();
const rescue = require('express-rescue');
const SalesRoute = require('../controllers/SalesController');

router
.get('/', rescue(SalesRoute.getAll))
.get('/:saleId', rescue(SalesRoute.getById));

module.exports = router;
