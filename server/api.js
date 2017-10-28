var express = require('express');
var products = require('./controllers/products.ctrl');
var purchases = require('./controllers/purchases.ctrl');


var router = express.Router();

router.use('/products', products);
router.use('/purchases', purchases);



module.exports = router;