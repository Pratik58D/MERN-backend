const express = require('express');
const router = express.Router();
const { createProduct, searchProducts } = require('../Controllers/productController');

// Route to create a new product
router.post('/create', createProduct);

// Route to search products
router.get('/search', searchProducts);

module.exports = router;
