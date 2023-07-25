const mongoose = require("mongoose");

const freeShippingSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  freeShipping: {
    type: Boolean,
    default: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    expires: 0,
    required: true,
  },
});

const FreeShipping = mongoose.model("freeShipping", freeShippingSchema);

module.exports = FreeShipping;
