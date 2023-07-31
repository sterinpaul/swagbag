var mongoose = require("mongoose");
require('mongoose-double')(mongoose);
const moment = require('moment-timezone');
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
var SchemaTypes = mongoose.Schema.Types;

var ZipSchema = mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    timeslot: {
        type: String,
        default: ""
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cities'
    },
    additional_cost: {
        type: SchemaTypes.Double,
        default: 0
    },
    created_date: {
        type: Date, default: dateKolkata
    },
    update_date: {
        type: Date, default: dateKolkata
    },
    active: {
        type: Number,
        default: 0
    },
    deleted: {
        type: Number,
        default: 0
    },
    cod: {
        type: Boolean,
        default: true
    },
    express: {
        type: Boolean,
        default: true
    }
});
module.exports = mongoose.model('zips', ZipSchema);