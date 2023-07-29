const mongoose = require("mongoose");

const freeShippingSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  areas: {
    type: [String],
    enum: ["in_service", "out_service", "international"],
    required: true,
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
});

module.exports = FreeShipping = mongoose.model("freeShipping", freeShippingSchema);
