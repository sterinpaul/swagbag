var mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
const moment = require('moment-timezone');
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");

var StockTransactionProductSchema = mongoose.Schema({
    inward_office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'offices',
        default: null
    },
    outward_office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'offices',
        default: null
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stock_transactions'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stock_products'
    },
    name: {
        type: String,
        default: ""
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stock_categories',
        default: null
    },
    sub_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stock_categories',
        default: null
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendors'
    },
    qty: {
        type: Number,
        default: 0
    },
    unit: {
        type: String,
        default: ""
    },
    rate: {
        type: SchemaTypes.Double,
        default: ""
    },
    total: {
        type: SchemaTypes.Double,
        default: ""
    },
    created_date: {
        type: Date, default: dateKolkata
    },
    type: {
        type: Number,
        default: 0,
    }
});
module.exports = mongoose.model('stock_transaction_products', StockTransactionProductSchema);