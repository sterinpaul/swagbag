const mongoose = require("mongoose");
const ProductModel = require("./ProductModel");

const NewShippingSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["local", "outerservice", "international"],
    required: true,
  },
  delivery_time: {
    type: String,
  },
  free_shipping: {
    type: Boolean,
    required: true,
  },
  shipping_cost: {
    type: Number,
    required: true, 
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

const NewShipping = mongoose.model("newshippings", NewShippingSchema);

NewShippingSchema.pre("remove", async function (next) {
  // Before removing a shipping option, update associated products
  const shippingOptionId = this._id;

  try {
    // Find all products that have this shipping option in their shippingOptions array
    const productsToUpdate = await ProductModel.find({ shippingOptions: shippingOptionId });

    // Remove the shipping option from each product's shippingOptions array
    await Promise.all(
      productsToUpdate.map((product) => {
        product.shippingOptions.pull(shippingOptionId);
        return product.save();
      })
    );

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = NewShipping;
