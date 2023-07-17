var mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
var GiftCardSchema = mongoose.Schema({
    card: {
        type: String,
        default: "",
    },
    desc: {
        type: String,
        default: "",
    },

    amount: {
        type: String,
        default: "",
    },

    created_date: {
        type: Date,
        default: dateKolkata,
    },
    update_date: {
        type: Date,
        default: dateKolkata,
    },
    active: {
        type: Number,
        default: 0,
    },
    deleted: {
        type: Number,
        default: 0,
    },
});
module.exports = mongoose.model("gift_card", GiftCardSchema);
