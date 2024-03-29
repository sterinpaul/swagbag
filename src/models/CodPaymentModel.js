var mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
var CodPaymentSchema = mongoose.Schema({
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cities',
        default: null
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expense_categories',
        default: null
    },
    sub_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expense_categories',
        default: null
    },
    amount: {
        type: String,
        default: ""
    },
    payment_recvied: {
        type: String,
        default: ""
    },
    date_of_payment: {
        type: Date, default: dateKolkata
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cities',
        default: null
    },
    comment: {
        type: String,
        default: ""
    },
    active: {
        type: Number,
        default: 0
    },
    deleted: {
        type: Number,
        default: 0
    },
    created_date: {
        type: Date, default: dateKolkata
    },
    update_date: {
        type: Date, default: dateKolkata
    },
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    delivery_boy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'offices',
        default: null
    },
    file: {
        type: []
    },
    number: {
        type: String,
        default: ""
    },
    office_type: {
        type: String,
        default: ""
    },
    action_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
});
module.exports = mongoose.model('cod_payments', CodPaymentSchema);