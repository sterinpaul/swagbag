const ProductModel = require("../models/ProductModel");
const FreeShipping = require("../models/freeshippingModel");
const NewShipping = require("../models/newShippingModel");
const zoneModel = require("../models/zoneModel");

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
      // Fetch all zones from the database
      const result = await zoneModel.find({});
      res.status(200).json({ status: "success", result, totalCount: result.length });
    } catch (error) {
      res.status(500).json({ status: "error", error: "Failed to fetch zones." });
    }
  },

  addZone: async (req, res) => {
    //
    const { zone_name, cix_price, ciy_price, twv, free_shipping } = req.body;

    try {
      // Create a new zone in the database using the provided details
      const newZone = await zoneModel.create({ zone_name, cix_price, ciy_price, twv, free_shipping });

      if (!newZone) {
        return res.status(500).json({ status: "error", error: "Failed to create the zone." });
      }

      res.status(200).json({ status: "success", result: newZone });
    } catch (error) {
      res.status(500).json({ status: "error", error: "Failed to add the zone." });
    }
  },

  updateZone: async (req, res) => {
    const { zone_name, cix_price, ciy_price, twv, free_shipping } = req.body;
    const zoneId = req.params.id;
    try {
      // Find the zone in the database and update it with the provided details
      const updateZone = await zoneModel.findByIdAndUpdate(
        zoneId,
        {
          zone_name,
          cix_price,
          ciy_price,
          twv,
          free_shipping,
        },
        { new: true }
      );

      if (!updateZone) {
        res.status(404).json({ status: "error", error: "Zone not found." });
      }

      res.status(200).json({ status: "success", result: updateZone });
    } catch (error) {
      res.status(500).json({ status: "error", error: "Failed to update the zone." });
    }
  },

  deleteZone: async (req, res) => {
    const zoneId = req.params.id;
    try {
      // Find the zone in the database and delete it
      const deleteZone = await zoneModel.findByIdAndDelete(zoneId);

      if (!deleteZone) {
        res.status(404).json({ status: "error", error: "Zone not found." });
      }

      res.status(200).json({ status: "success", message: "Zone deleted successfully." });
    } catch (error) {
      res.status(500).json({ status: "error", error: "Failed to delete the zone." });
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
