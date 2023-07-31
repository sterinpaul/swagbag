var mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
var MasterCategorySchema = mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    file: {
        type: String,
        default: "",
    },
    desc: {
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
    sort: {
        type: Number,
        default: 0,
    },
});
MasterCategorySchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("master_categories", MasterCategorySchema);
