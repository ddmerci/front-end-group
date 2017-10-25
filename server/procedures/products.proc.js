var db = require('../config/db.js');


exports.apparel = function () {
    return db.rows('getApparel');
}

exports.merch = function () {
    return db.rows('getMerch');
}

exports.read = function (id) {
    return db.row('getProduct', [id]);
}

