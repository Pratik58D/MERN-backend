const express = require('express');
const router = express.Router();
const { createProduct, searchProducts,  getProducts, getProduct, updateProduct, deleteProduct } = require('../Controllers/productController');
const { productImage } = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { authorizeRole } = require('../middleware/authorizationMiddleware');

// Route to create a new product
router.post('/create',authMiddleware,productImage.single("productImage"),authorizeRole("admin"), createProduct);

//get all the Products
router.get("/",getProducts)

//get product by id

router.get("/:productId",getProduct)

//for update by id
router.put("/update/:productId",productImage.single("productImage"),updateProduct);

router.delete("/delete/:productId",productImage.single("productImage"),deleteProduct);

// Route to search products
router.get('/search', searchProducts);



module.exports = router;
