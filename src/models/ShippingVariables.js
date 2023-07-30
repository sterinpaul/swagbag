const mongoose = require("mongoose");

// Define the schema
const shippingVariables = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    TPV: {
      type: Number,
      required: false,
    },
    TWV: {
      type: Number,
      required: true,
    },
    SI: {
      type: Number,
      required: true,
    },
    SP: {
      type: Number,
      required: true,
    },
    free_shipping: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true } // Optional: Add timestamps for createdAt and updatedAt fields
);

// Create the model
const ShippingVariables = mongoose.model(
  "shippingVariables",
  shippingVariables
);

module.exports = ShippingVariables;
