const express = require('express');

const router = express.Router();
const rescue = require('express-rescue');
const ProductController = require('../controllers/ProductController');

router
.get('/', rescue(ProductController.getAll))
.get('/:id', rescue(ProductController.getById))
.post('/', rescue(ProductController.postProduct))
.put('/:id', rescue(ProductController.putProduct))
.delete('/:id', rescue(ProductController.deleteProduct));

module.exports = router;
