var mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
var AddressSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null,
    },
    title: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    address2: {
        type: String,
        default: "",
    },
    state: {
        type: String,
        default: "",
    },
    post_office: {
        type: String,
        default: "",
    },

    country: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    pincode: {
        type: String,
        default: "",
    },
    contact_name: {
        type: String,
        default: "",
    },
    country_code_number: {
        type: String,
        default: "",
    },
    contact_mobile: {
        type: String,
        default: "",
    },
    deleted: {
        type: Number,
        default: 0,
    },
    created_date: {
        type: Date,
        default: dateKolkata,
    },
    update_date: {
        type: Date,
        default: dateKolkata,
    },
    position: {
        type: {
            type: String,
            default: "Point",
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },

    landmark: {
        type: String,
        default: "",
    },
});
AddressSchema.index({ position: "2dsphere" });
module.exports = mongoose.model("addresses", AddressSchema);
