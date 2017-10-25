var express = require('express');
var products = require('./controllers/products.ctrl');
var purchases = require('./controllers/purchases.ctrl');
var checkout = require('./controllers/checkout.ctrl');

var router = express.Router();

router.use('/products', products);
router.use('/purchases', purchases);
router.use('/checkout', checkout);


module.exports = router;