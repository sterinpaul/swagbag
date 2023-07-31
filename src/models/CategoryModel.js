var mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
var CategorySchema = mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    description_after_content: {
        type: String,
        default: "",
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        default: null,
    },
    master: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "master_categories",
        default: null,
    },
    file: {
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
    brands: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "brands",
        },
    ],
});
CategorySchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("categories", CategorySchema);
