var mongoose = require("mongoose");
const moment = require('moment-timezone');
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
var ReviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        default: null
    },
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    country_code_number: {
        type: String,
        default: "",
    },
    mobile: {
        type: String,
        default: ""
    },
    rating: {
        type: String,
        default: ""
    },
    review: {
        type: String,
        default: ""
    },
    created_date: {
        type: Date, default: dateKolkata
    },
    active: {
        type: Number,
        default: 0
    },
    deleted: {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('reviews', ReviewSchema);