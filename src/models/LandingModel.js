var mongoose = require("mongoose");

var LandingSchema = mongoose.Schema({
    grid: {
        type: String,
        default: "",
    },
    upload1: {
        type: String,
        default: "",
    },
    url1: {
        type: String,
        default: "",
    },

    upload2: {
        type: String,
        default: "",
    },
    url2: {
        type: String,
        default: "",
    },
    upload3: {
        type: String,
        default: "",
    },
    url3: {
        type: String,
        default: "",
    },

    upload4: {
        type: String,
        default: "",
    },
    url4: {
        type: String,
        default: "",
    },
    upload5: {
        type: String,
        default: "",
    },
    url5: {
        type: String,
        default: "",
    },
    upload6: {
        type: String,
        default: "",
    },
    url6: {
        type: String,
        default: "",
    },
    upload7: {
        type: String,
        default: "",
    },
    url7: {
        type: String,
        default: "",
    },
    sort: {
        type: Number,
        default: 0,
    },
});
module.exports = mongoose.model("landing_extra", LandingSchema);
