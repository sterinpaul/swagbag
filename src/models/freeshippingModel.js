const mongoose = require("mongoose");

const freeShippingSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  areas: {
    type: Object,
   properties:{
    in_service:{type:Boolean},
    out_service:{type:Boolean},
    international:{type:Boolean}
   }
  },
  from_date: {
    type: Date,
    required: true,
  },
  to_date: {
    type: Date,
    expires: 0,
    required: true,
  },
},{timestamps:true});

module.exports = FreeShipping = mongoose.model("freeShipping", freeShippingSchema);
