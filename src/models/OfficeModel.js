var mongoose = require("mongoose");
require('mongoose-double')(mongoose);
const moment = require('moment-timezone');
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
var SchemaTypes = mongoose.Schema.Types;

var OfficeSchema = mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cities'
    },
    address: {
        type: String,
        default: ""
    },
    contact_person: {
        type: String,
        default: ""
    },
    contact_person_email: {
        type: String,
        default: ""
    },
    country_code_number: {
        type: String,
        default: "",
    },
    contact_person_mobile: {
        type: String,
        default: ""
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
    }
});
module.exports = mongoose.model('offices', OfficeSchema);