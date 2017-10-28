var express = require('express');
var procedures = require('../procedures/purchases.proc');
var stripeSvc = require('../services/stripe.svc');

var router = express.Router();

router.post('/', function (req, res) {
    var p = req.body;
    var amount = Number(p.amount);
    stripeSvc.charge(p.token, amount)
        .then(function (charge) {
            return procedures.create(charge.amount, charge.id)
        })
        .then(function (purchase) {
            var promises = [];
            for (i = 0; i < checkoutItems.length; i++) {
                promises.push(procedures.createToPurchased(checkoutItems.id[i], purchase.id));
            }
            return Promise.all(promises);
        })
        // .then(function() {

        // })

 });

module.exports = router;   