var mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;
var CartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        default: null,
    },
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    option: {
        type: Array,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    price: {
        type: SchemaTypes.Double,
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
    uniqueid: {
        type: String,
        default: "",
    },
});
module.exports = mongoose.model("carts", CartSchema);
