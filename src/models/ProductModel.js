var mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const moment = require("moment-timezone");
const dateKolkata = moment.tz(Date.now(), "Asia/Kolkata");
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var ProductSchema = mongoose.Schema(
  {
    combo_products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],

    name: {
      type: String,
      default: "",
    },
    master_category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "master_categories",
        default: null,
      },
    ],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        default: null,
      },
    ],
    sub_category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        default: null,
      },
    ],
    cuisine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cuisines",
      default: null,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brands",
      default: null,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    desc: {
      type: String,
      default: "",
    },
    short_desc: {
      type: String,
      default: "",
    },
    additional_description: {
      type: String,
      default: "",
    },
    details: {
      type: String,
      default: "",
    },
    file: {
      type: [],
    },
    price: {
      type: SchemaTypes.Double,
      default: "",
    },
    selling_price: {
      type: SchemaTypes.Double,
      default: "",
    },
    discounted_price: {
      type: SchemaTypes.Double,
      default: "",
    },
    batchno: {
      type: String,
      default: "",
    },

    commission: {
      type: String,
      default: "",
    },
    packaging_charge: {
      type: String,
      default: "",
    },
    tax_status: {
      type: String,
      default: "",
    },
    cgst: {
      type: String,
      default: "",
    },
    sgst: {
      type: String,
      default: "",
    },
    igst: {
      type: String,
      default: "",
    },
    sku: {
      type: String,
      default: "",
    },
    stock_qty: {
      type: String,
      default: "",
    },
    backorders: {
      type: String,
      default: "",
    },
    threshold: {
      type: String,
      default: "",
    },
    manage_stock: {
      type: Number,
      default: 0,
    },
    weight: {
      type: String,
      default: "",
    },
    length: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
    // shipping: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'shipping_classes',
    //     default: null
    // },
    attribute: {
      type: String,
      default: "",
    },
    tags: {
      type: String,
      default: "",
    },

    start_date: {
      type: Date,
      default: dateKolkata,
    },
    end_date: {
      type: Date,
      default: dateKolkata,
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
    deal: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Number,
      default: 0,
    },
    express: {
      type: Boolean,
      default: true,
    },
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    point: {
      type: Number,
      default: 0,
    },
    point_exp_date: {
      type: Date,
      default: dateKolkata,
    },
    options: {
      type: Array,
      default: [],
    },
    shelving_location: {
      type: String,
      default: "",
    },
    video_url: {
      type: String,
      default: "",
    },

    returnable: {
      type: String,
      default: "",
    },

    return_day: {
      type: String,
      default: "",
    },

    product_types: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product_types",
        default: null,
      },
    ],

    unit_cost: {
      type: String,
      default: "",
    },
    up_code: {
      type: String,
      default: "",
    },
    hs_code: {
      type: String,
      default: "",
    },
    fulfilment_center: {
      type: String,
      default: "",
    },
    mfg_date: {
      type: Date,
      default: dateKolkata,
    },
    expiry_date: {
      type: Date,
      default: dateKolkata,
    },
    vendor_sku: {
      type: String,
      default: "",
    },
    bin_location: {
      type: String,
      default: "",
    },
    profit_margin: {
      type: String,
      default: "",
    },
    country_of_origin: {
      type: String,
      default: "",
    },
    sale_count: {
      type: Number,
      default: 0,
    },
    freeShipping:{
      type:mongoose.Schema.Types.ObjectId,
     ref:"freeShipping"
    }
  },
  { timestamps: true }
);
ProductSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("products", ProductSchema);
