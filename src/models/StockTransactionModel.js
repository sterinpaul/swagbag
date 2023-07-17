var mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const moment = require('moment-timezone');
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");

let counter = 1;
let CountedId = {type: Number, default: () => counter++};

var StockTransactionSchema = mongoose.Schema({
    id: CountedId,
    bill_no: {
        type: String,
        default: ""
    },
    bill_date: {
        type: Date, default: null
    },
    amount: {
        type: SchemaTypes.Double,
        default: ""
    },
    created_date: {
        type: Date, default: dateKolkata
    },
    type: {
        type: Number,
        default: 0,
    },
    note: {
        type: String,
        default: ""
    },
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
});

const Model = mongoose.model('stock_transactions', StockTransactionSchema);
module.exports = Model;

Model.find({ id: { $gt: 0 } }).sort({ id: -1 })
.then(([first, ...others]) => {
    if (first)
        counter = first.id + 1;
});