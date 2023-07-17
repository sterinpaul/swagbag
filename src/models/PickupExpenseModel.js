var mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
var PickupExpenseSchema = mongoose.Schema({
    name: {
        type: String,
        default: ""
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
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cities',
        default: null
    },
    bag_no: {
        type: String,
        default: ""
    },
    weight: {
        type: String,
        default: ""
    },
    kilomiter: {
        type: String,
        default: ""
    },
    amount: {
        type: String,
        default: ""
    },
    date_of_payment: {
        type: Date, default: dateKolkata
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
    office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'offices',
        default: null
    },
    file: {
        type: []
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
module.exports = mongoose.model('pickup_expenses', PickupExpenseSchema);