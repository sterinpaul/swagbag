var mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
var CountrySchema = mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    country_code: {
        type: String,
        default: "",
    },
    price_per_kg: {
        type: String,
        default: "",
    },
    price_cubic_cm: {
        type: String,
        default: "",
    },
    active: {
        type: Number,
        default: 0,
    },

    created_date: {
        type: Date,
        default: dateKolkata,
    },
    deleted: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("countries", CountrySchema);
