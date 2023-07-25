const ProductModel = require("../models/ProductModel");
const FreeShipping = require("../models/freeshippingModel");
const NewShipping = require("../models/newShippingModel");

module.exports = {
  addFreeshipping: (req, res) => {
    try {
      const { productIds, fromDate, toDate } = req.body;
      productIds.forEach(async (productId) => {
        const res = await FreeShipping.create({
          product: productId,
          fromDate: fromDate,
          toDate: toDate,
        });
        console.log(res);
      });
      res.json({ message: "Free shipping status updated successfully" });
    } catch (error) {
      console.log(error);
    }
  },
  listFreeshipping: async (req, res) => {
    try {
      const data = await FreeShipping.find();
      res.json({ message: "List of freeshipping products", listFreeshipping: data });
    } catch (error) {
      console.log(error);
    }
  },
  addShipping: async (req, res) => {
    try {
      const { shippingData, fromDate, toDate } = req.body;
      shippingData.forEach((shipping) => {
        shipping.types.forEach((type) => {
          createShipping(type, shipping, fromDate, toDate);
        });
      });
      res.json({ message: "Shipping options updated successfully" });
    } catch (error) {
      console.log(error);
    }
  },
  listShipping: async (req, res) => {
    try {
      const shippingList = await NewShipping.find({});
      res.json({ shippingList });
    } catch (error) {
      console.log(error);
    }
  },
  deleteShipping: async (req, res) => {
    try {
      const id = req.params.id;
      // Find the shipping option to delete
      const shippingOption = await NewShipping.findById(id);

      if (!shippingOption) {
        return res.status(404).json({ error: "Shipping option not found" });
      }
      // Delete the shipping option from the collection
      await shippingOption.remove();

      res.json({ message: "Shipping option deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  },

  updateShipping: async (req, res) => {
    try {
      const id = req.params.id;
      const { newtype, shippingData, fromDate, toDate } = req.body;
      if (newtype) {
        createShipping(shippingData.type, shippingData, fromDate, toDate);
      }
      res.json({ status: 200, message: "Shipping option updated successfully" });
    } catch (error) {
      console.log(error);
    }
  },
  Zones: async (req, res) => {
    try {
      const data = [
        {
          _id: 1,
          zone_name: "Zone 1",
          cix_price: 65,
          ciy_price: 56,
          twv: 5.5,
          freeShipping: false,
        },
        {
          _id: 2,
          zone_name: "Zone 2",
          cix_price: 75,
          ciy: 22,
          twv: 10,
          freeShipping: true,
        },
        {
          _id: 3,
          zone_name: "Zone 3",
          cix_price: 90,
          ciy_price: 33,
          twv: 20.1,
          freeShipping: false,
        },
      ];
      res.status(200).json({ status: "success", result: data, totalCount: data.length });
    } catch (error) {
      res.status(405).json({ error: error.message });
    }
  },
};

async function createShipping(type, shipping, fromDate, toDate) {
  try {
    const result = await NewShipping.create({
      type: type,
      free_shipping: shipping.freeShipping ? shipping.freeShipping : false,
      shipping_cost: shipping.shippingCost ? shipping.shippingCost : false,
      fromDate: fromDate,
      toDate: toDate,
    });
    if (result) {
      const product = await ProductModel.findById(shipping.productId);
      if (!product.shippingOption.includes(result._id)) {
        product.shippingOption.push(result._id);
        return result;
      }
    }
  } catch (error) {
    console.log(error);
  }
}
