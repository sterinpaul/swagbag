var mongoose = require("mongoose");
var CurrencySchema = mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    code: {
        type: String,
        default: "",
    },
    symbol: {
        type: String,
        default: "",
    },
    value: {
        type: String,
        default: "",
    },
    is_default: {
        type: Number,
        default: 0,
    },
    active: {
        type: Number,
        default: 0,
    },
});
module.exports = mongoose.model("currencies", CurrencySchema);
