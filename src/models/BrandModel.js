var mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
var BrandSchema = mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    file: {
        type: String,
        default: "",
    },
    file2: {
        type: String,
        default: "",
    },
    file3: {
        type: String,
        default: "",
    },
    file4: {
        type: String,
        default: "",
    },
    desc: {
        type: String,
        default: "",
    },
    desc2: {
        type: String,
        default: "",
    },
    desc3: {
        type: String,
        default: "",
    },
    seo_title: {
        type: String,
        default: "",
    },
    seo_desc: {
        type: String,
        default: "",
    },
    short_desc: {
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
        default: 1,
    },
    deleted: {
        type: Number,
        default: 0,
    },
});
BrandSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("brands", BrandSchema);
