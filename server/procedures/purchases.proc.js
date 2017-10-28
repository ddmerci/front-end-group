var db = require('../config/db');



exports.create = function (price, stripetransactionid) {
    return db.row('addNewPurchase', [price, stripetransactionid]);
}

exports.createToPurchased = function (productid, purchaseid) {
    return db.row('addPurchasesToItem', [productid, purchaseid]);
}
