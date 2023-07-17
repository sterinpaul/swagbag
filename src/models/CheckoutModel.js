var mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var checkoutSchema = mongoose.Schema({
    orderid: {
        type: String,
        default: "",
    },
    transactionid: {
        type: String,
        default: "",
    },
    gateway: {
        type: String,
        default: "",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null,
    },

    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses",
    },

    billing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses",
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                default: null,
            },

            quantity: {
                type: Number,
                default: 0,
            },
            price: {
                type: SchemaTypes.Double,
                default: 0,
            },
            productname: {
                type: String,
                default: "",
            },
            option: {
                type: Array,
                default: [],
            },
            final: {
                type: String,
                default: "",
            },
        },
    ],
    coupon: {
        type: String,
        default: "",
    },
    coupontype: {
        type: String,
        default: "",
    },
    couponamount: {
        type: String,
        default: "",
    },
    price: {
        type: String,
        default: "",
    },
    finalprice: {
        type: String,
        default: "",
    },
    tax: {
        type: String,
        default: "0",
    },
    status: {
        type: String,
        default: "pending_payment",
    },

    created_date: {
        type: Date,
        default: Date.now,
    },
    update_date: {
        type: Date,
        default: Date.now,
    },
    otp: {
        type: String,
        default: "",
    },

    deleted: {
        type: Number,
        default: 0,
    },
    paid: {
        type: SchemaTypes.Double,
        default: 0,
    },

    note: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "Normal",
    },
    gift_card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coupons",
    },
    gift_fname: {
        type: String,
        default: "",
    },
    gift_lname: {
        type: String,
        default: "",
    },
    gift_email: {
        type: String,
        default: "",
    },
    gift_phone: {
        type: String,
        default: "",
    },
    gift_code: {
        type: String,
        default: "",
    },
    gift_message: {
        type: String,
        default: "",
    },

    shipping: {
        type: String,
        default: "",
    },
    packing: {
        type: String,
        default: "",
    },
    balance: {
        type: String,
        default: "",
    },

    return_reason: {
        type: String,
        default: "",
    },

    return_products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            default: null,
        },
    ],

    gitwrap: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            default: null,
        },
    ],
});

module.exports = mongoose.model("checkouts", checkoutSchema);
