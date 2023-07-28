const Mongoose = require("mongoose");

const zoneSchema = new Mongoose.Schema(
  {
    zone_name: {
      type: String,
      required: true,
    },
    cix_price: {
      type: Number,
      required: true,
    },
    ciy_price: {
      type: Number,
    },
    twv: {
      type: Number,
      required: true,
    },
    free_shipping: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = Zone = Mongoose.model("zone", zoneSchema);
