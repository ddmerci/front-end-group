var express = require('express');
var procedures = require('../procedures/purchases.proc');
var stripeSvc = require('../services/stripe.svc');

var router = express.Router();

router.post('/', function (req, res) {
    var p = req.body;
    var amount = Number(p.amount);
    stripeSvc.charge(p.token, amount)
        .then(function (charge) {
            return procedures.create(amount, charge.id)
        })
        .then(function (purchase) {
            var promises = [];
            for (i = 0; i < p.cart.length; i++) {
                promises.push(procedures.createToPurchased(p.cart[i].id, purchase.id));
            }
            return Promise.all(promises);
        })

        .then(function (success) {
            res.sendStatus(204);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        })

});

module.exports = router;   