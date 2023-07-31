var mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");

var WishSchema = mongoose.Schema({
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
    slug: {
        type: String,
    },
    created_date: {
        type: Date,
        default: dateKolkata,
    },
    update_date: {
        type: Date,
        default: dateKolkata,
    },
});
module.exports = mongoose.model("wish", WishSchema);
