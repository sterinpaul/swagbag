var mongoose = require("mongoose");
require('mongoose-double')(mongoose);
const moment = require('moment-timezone');
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
var SchemaTypes = mongoose.Schema.Types;

var ZipSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    point: {
        type: Number,
        default: 0
    },
    type: {
        type: Number,
        default: 0
    },
    note: {
        type: String,
        default: ""
    },
    created_date: {
        type: Date, default: dateKolkata
    },
    update_date: {
        type: Date, default: dateKolkata
    }
});
module.exports = mongoose.model('wallets', ZipSchema);