var mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
var UserSchema = mongoose.Schema({
    sso: {
        type: String,
        default: "",
    },
    full_name: {
        type: String,
        default: "",
    },
    fname: {
        type: String,
        default: "",
    },
    lname: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: "",
    },
    country_code_number: {
        type: String,
        default: "",
    },
    mobile: {
        type: String,
        default: "",
    },
    user_type: {
        type: String,
        default: "admin",
    },
    otp: {
        type: Number,
        default: 0,
    },
    email_otp: {
        type: Number,
        default: 0,
    },
    created_date: {
        type: Date,
        default: dateKolkata,
    },
    update_date: {
        type: Date,
        default: dateKolkata,
    },
    profile_image: {
        type: String,
        default: null,
    },
    active: {
        type: Number,
        default: 0,
    },
    login_active: {
        type: Number,
        default: 1,
    },
    deleted: {
        type: Number,
        default: 0,
    },
    address: {
        type: String,
        default: "",
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "city",
        default: null,
    },
    cod: {
        type: Number,
        default: 1,
    },
    customer_support_city: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "city",
        },
    ],
    delivery_city: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "city",
        },
    ],
    price_per_kg: {
        type: String,
        default: 0,
    },
    price_per_pack: {
        type: String,
        default: 0,
    },

    rate_per_km: {
        type: String,
        default: 0,
    },
    monthly_fixed_cost: {
        type: String,
        default: 0,
    },

    communication_zipcode: {
        type: String,
        default: "",
    },
    service_zipcode: {
        type: String,
        default: "",
    },
    bank_name: {
        type: String,
        default: null,
    },
    acc_holder_name: {
        type: String,
        default: null,
    },
    acc_number: {
        type: String,
        default: null,
    },
    branch_code: {
        type: String,
        default: null,
    },
    ifsc: {
        type: String,
        default: null,
    },
    bank_address: {
        type: String,
        default: null,
    },
    master: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null,
    },
    slug: {
        type: String,
        default: "",
    },
    about: {
        type: String,
        default: "",
    },
    note: {
        type: String,
        default: "",
    },
    commission_type: {
        type: String,
        default: "",
    },
    commission: {
        type: String,
        default: "",
    },
    file: {
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
    device_token: {
        type: String,
        default: "",
    },
    device_type: {
        type: String,
        default: "",
    },
    vendor_position: {
        type: {
            type: String,
            default: "Point",
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },
    cargo_position: {
        type: {
            type: String,
            default: "Point",
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },
    delivery_partner_position: {
        type: {
            type: String,
            default: "Point",
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },
    lp_manager: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            default: null,
        },
    ],
    delivery_boy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            default: null,
        },
    ],
    doc1_type: {
        type: String,
        default: "",
    },
    doc1: {
        type: String,
        default: "",
    },
    doc2_type: {
        type: String,
        default: "",
    },
    doc2: {
        type: String,
        default: "",
    },
    doc3_type: {
        type: String,
        default: "",
    },
    doc3: {
        type: String,
        default: "",
    },
    cod_order_cost: {
        type: Number,
        default: 0,
    },
    additional_cost1: {
        type: Number,
        default: 0,
    },
    additional_cost2: {
        type: Number,
        default: 0,
    },
    reffer_by: {
        type: String,
        default: "",
    },
    reffer_code: {
        type: String,
        default: "",
    },
    first_time: {
        type: Number,
        default: 0,
    },
    subscription: {
        plan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "plans",
            default: null,
        },
        exp_date: {
            type: Date,
            default: null,
        },
        point: {
            type: Number,
            default: 0,
        },
        key: {
            type: String,
            default: "",
        },
        updated: {
            type: Date,
            default: null,
        },
    },
    office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "offices",
        default: null,
    },
    salary: {
        type: String,
        default: "",
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoleAndPermission",
        default: null,
    },
    deactivation_reason: {
        type: String,
        default: "",
    },
    website: {
        type: String,
        default: "",
    },
    contact_person1: {
        name: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        mobile: {
            type: String,
            default: ''
        },
    },
    contact_person2: {
        name: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        mobile: {
            type: String,
            default: ''
        },
    },
    contact_person3: {
        name: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        mobile: {
            type: String,
            default: ''
        },
    },
});
UserSchema.index({ vendor_position: "2dsphere" });
UserSchema.index({ cargo_position: "2dsphere" });
UserSchema.index({ delivery_partner_position: "2dsphere" });
module.exports = mongoose.model("users", UserSchema);
