var express = require('express');
var procedures = require('../procedures/products.proc');

var router = express.Router();

router.get('/apparel', function (req, res) {
    procedures.apparel()
        .then(function (apparel) {
            res.send(apparel);
        }).catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        })
});

router.get('/merch', function (req, res) {
    procedures.merch()
        .then(function (merch) {
            res.send(merch);
        }).catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        })
})

router.get('/:id', function (req, res) {
    procedures.read(req.params.id)
        .then(function (product) {
            res.send(product);
        }).catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        })
});

module.exports = router;