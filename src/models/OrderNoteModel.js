var mongoose = require("mongoose");
require('mongoose-double')(mongoose);
const moment = require('moment-timezone');
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
var SchemaTypes = mongoose.Schema.Types;

var OrderNoteSchema = mongoose.Schema({
    note: {
        type: String,
        default: ""
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'checkouts'
    },
    created_date: {
        type: Date, default: dateKolkata
    }
});
module.exports = mongoose.model('order_note', OrderNoteSchema);