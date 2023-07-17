var mongoose = require("mongoose");
const moment = require('moment-timezone');
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
var BulkOrderSchema = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    country_code_number: {
        type: String,
        default: "",
    },
    mobile: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    },
    active: {
        type: Number,
        default: 1
    },
});
module.exports = mongoose.model('bulk_orders', BulkOrderSchema);