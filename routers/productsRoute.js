const express = require('express');

const router = express.Router();
const rescue = require('express-rescue');
const ProductController = require('../controllers/ProductController');

router
.get('/', rescue(ProductController.getAll))
.get('/:id', rescue(ProductController.getById));

module.exports = router;
