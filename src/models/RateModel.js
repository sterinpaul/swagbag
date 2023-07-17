var mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var RateSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stock_products'
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendors'
    },
    unit: {
        type: String,
        default: ""
    },
    price: {
        type: SchemaTypes.Double,
        default: 0
    },
    note: {
        type: String,
        default: ""
    }
});
module.exports = mongoose.model('product_rates', RateSchema);