var express = require('express');
var procedures = require('../procedures/purchases.proc');

var router = express.Router();

router.post('/', function (req, res) {
    var p = req.body;
    procedures.create(p.productid, p.price, p.stripetransactionid)
        .then(function (id) {
            res.status(201).send(id);
        }).catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;