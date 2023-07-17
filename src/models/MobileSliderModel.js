var mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
var SliderSchema = mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    file: {
        type: String,
        default: "",
    },
    url: {
        type: String,
        default: "",
    },
    master_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "master_categories",
        default: null,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        default: null,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        default: null,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brands",
        default: null,
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
        default: 1,
    },
    deleted: {
        type: Number,
        default: 0,
    },
    sort: {
        type: Number,
        default: 1,
    },
});
module.exports = mongoose.model("mobile_sliders", SliderSchema);
