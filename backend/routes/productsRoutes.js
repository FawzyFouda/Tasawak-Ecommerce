const express = require('express');
const { getAllProducts,getProduct, getCart } = require('../controllers/productsController');
const router = express.Router();

router.get('/products', getAllProducts);
router.get('/product/:id', getProduct);
router.get('/cart', getCart);
module.exports = router;