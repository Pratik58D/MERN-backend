const express = require('express');
const router = express.Router();

const  {createProduct}  = require('../Controllers/productController');

//create Product routes
router.post("/create",createProduct);




module.exports = router;