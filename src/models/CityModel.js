var mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
var CitySchema = mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    additional_cost: {
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

    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "countries",
        default: null,
    },

    isDefault: {
        type: Number,
        default: 0,
    },
});
CitySchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("cities", CitySchema);
