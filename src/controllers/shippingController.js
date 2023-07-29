const ProductModel = require("../models/ProductModel");
const FreeShippingModel = require("../models/freeshippingModel");
const NewShipping = require("../models/newShippingModel");
const zoneModel = require("../models/zoneModel");
const mongoose = require("mongoose");
const CountriesZoned = require("../models/CountriesZoned");
const { json } = require("express");
const freeshippingModel = require("../models/freeshippingModel");


module.exports = {
  addFreeshipping: async (req, res) => {
    const { selected_productIds, areas, from_date, to_date } = req.body;
    try {
      const responseData = await Promise.all(
        selected_productIds?.map(async (product_id) => {
          const resultDta = await FreeShippingModel.create({
            product_id,
            areas,
            from_date,
            to_date,
          });
          await ProductModel.updateOne({_id:product_id},{$set:{freeShipping:true}})
          return resultDta;
        })
      );
      res.status(201).json({
        status: "success",
        message:
          "Free shipping has been successfully added for the selected products.",
        totalCount: responseData.length,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", error: "Failed to add the freeshipping." });
    }
  },
  listFreeshipping: async (req, res) => {
    try {
      const result = await FreeShippingModel.find().populate('product_id')
      res.status(200).json({ status: "success", result });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", error: "Failed to fetch freeshipping list." });
    }
  },
  getFreeShippingById:async(req,res)=>{
    const id = req.params.id;
    try {
      const result = await FreeShippingModel.findById(id).populate('product_id')
      if(!result){
        res.status(404).json({
          error: "Free shipping data not found.",
          message: `The free shipping with ID ${id} does not exist.`
        });
      }
      res.status(200).json({status:"success",result})
    } catch (error) {
      res.status(500),json({error:"Failed to find free shipping by ID."})
    }
  },
  updateFreeshipping:async(req,res)=>{
    const id = req.params.id;
    const update = req.body
    try {
      const isfreeShipping = await FreeShippingModel.findById(id)
      if(!isfreeShipping){
        res.status(404).json({error:"Free shipping not found",message:`The free shipping with ID ${id} does not exist.`})
      }
      Object.assign(isfreeShipping, update);
      await isfreeShipping.save();
      res.status(200).json({status:"success",result:isfreeShipping})
       
    } catch (error) {
      res.status(500),json({error:"Failed to update free shipping."})
    }
  },
  deleteFreeshipping:async(req,res)=>{
    try {
      const response = await FreeShippingModel.findByIdAndDelete(req.params.id)
      if(response === null){
         res.status(404).json({ error: "Failed to delete free shipping." });
      }
       res.status(200).json({status:"success",result:response})
    } catch (error) {
      res.status(500).json({error:"Failed to delete free shipping."})
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
      res.json({
        status: 200,
        message: "Shipping option updated successfully",
      });
    } catch (error) {
      console.log(error);
    }
  },

  Zones: async (req, res) => {
    try {
      // Fetch all zones from the database
      const result = await zoneModel.find({});
      res
        .status(200)
        .json({ status: "success", result, totalCount: result.length });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", error: "Failed to fetch zones." });
    }
  },
  zoneDetail: async (req, res) => {
    const zoneId = req.params.id;
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.isValidObjectId(zoneId)) {
      return res.status(400).json({ error: "Invalid zone ID" });
    }
    try {
      // Find the zone by its ID in the database
      const zone = await zoneModel.findById(zoneId);

      // Check if the zone with the provided ID exists
      if (!zone) {
        return res.status(404).json({ error: "Zone not found" });
      }

      // If the zone is found, return it as a response
      res.json({ status: "success", result: zone });
    } catch (err) {
      // If there's an error while fetching the zone from the database
      console.error("Error while fetching zone by ID:", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  addZone: async (req, res) => {
    //
    const { zone_name, cix_price, ciy_price, twv, free_shipping } = req.body;

    try {
      // Create a new zone in the database using the provided details
      const newZone = await zoneModel.create({
        zone_name,
        cix_price,
        ciy_price,
        twv,
        free_shipping,
      });

      if (!newZone) {
        return res
          .status(500)
          .json({ status: "error", error: "Failed to create the zone." });
      }

      res.status(200).json({ status: "success", result: newZone });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", error: "Failed to add the zone." });
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
      res
        .status(500)
        .json({ status: "error", error: "Failed to update the zone." });
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

      res
        .status(200)
        .json({ status: "success", message: "Zone deleted successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", error: "Failed to delete the zone." });
    }
  },
  getCountriesZoned: async (req, res) => {
    try {
      // Fetch all zones from the database
      const result = await zoneModel.find({});
      res.status(200).json({
        status: "success",
        result: countries,
        totalCount: countries.length,
      });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", error: "Failed to fetch zones." });
    }
  },
  getCountries: async (req, res) => {
    try {
      // Fetch all zones from the database
      const result = await CountriesZoned.find({});
      res
        .status(200)
        .json({ status: "success", result, totalCount: result.length });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", error: "Failed to fetch Countries." });
    }
  },
  createZonedCountry: async (req, res) => {
    const { zone_id, country_code } = req.body;
    // Find the zone by its ID in the database
    const zone = await zoneModel.findById(zone_id);
    // Check if the zone with the provided ID exists
    if (!zone) {
      return res.status(404).json({ error: "Zone not found" });
    }

    const country = countries.find((item) => item.code === country_code);

    if (!country) {
      return res.status(404).json({ error: "country not found" });
    }

    try {
      // Create a new zone in the database using the provided details
      const newZonedCountry = await CountriesZoned.create({
        country_name: country.name,
        country_code: country.code,
        zone: {
          zone_name: zone.zone_name,
          zoneId: zone._id,
        },
      });

      if (!newZonedCountry) {
        return res.status(500).json({
          status: "error",
          error: "Failed to create the CountriesZoned.",
        });
      }

      res.status(200).json({ status: "success", result: newZonedCountry });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        error: "Failed to add the countries.",
      });
    }
  },
  getDetailCountryZoned: async (req, res) => {
    const zoneId = req.params.id;
    console.log(zoneId, "CountriesZoned");
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.isValidObjectId(zoneId)) {
      return res.status(400).json({ error: "Invalid zone ID" });
    }
    try {
      // Find the zone by its ID in the database
      const CountryZoned = await CountriesZoned.findById(zoneId);
      // Check if the zone with the provided ID exists
      if (!CountryZoned) {
        return res.status(404).json({ error: "Country zoned not found" });
      }

      // If the zone is found, return it as a response
      res.json({ status: "success", result: CountryZoned });
    } catch (err) {
      // If there's an error while fetching the zone from the database
      console.error("Error while fetching Country by ID:", err);
      res.status(500).json({ error: "Server error" });
    }
  },
  updateCountryZoned: async (req, res) => {
    const countryId = req.params.id;
    const zone_id = req.body.zone_id;
    try {
      // Find the zone in the database and update it with the provided details
      const zone = await zoneModel.findById(zone_id);
      // Check if the zone with the provided ID exists
      if (!zone) {
        return res.status(404).json({ error: "Zone not found" });
      }
      console.log(req.body);

      const country = await CountriesZoned.findById(countryId);
      if (!country) {
        return res.status(404).json({ error: "country not found" });
      }
      Object.assign(country, {
        // ...country,
        zone: {
          zone_name: zone.zone_name,
          zoneId: zone._id,
        },
      });
      await country.save();

      // if (!updateCountriesZoned) {
      //   res.status(404).json({ status: "error", error: "country not found." });
      // }

      res.status(200).json({ status: "success", result: country });
    } catch (error) {
      console.log(error, "server");
      res
        .status(500)
        .json({ status: "error", error: "Failed to update the zone." });
    }
  },
  deleteCountryZoned: async (req, res) => {
    const countryId = req.params.id;
    try {
      // Find the zone in the database and delete it
      const deletedCountryZoned = await CountriesZoned.findByIdAndDelete(
        countryId
      );

      if (!deletedCountryZoned) {
        res.status(404).json({ status: "error", error: "Zone not found." });
      }

      res
        .status(200)
        .json({ status: "success", message: "Zone deleted successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", error: "Failed to delete the zone." });
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
const countries = [
  { name: "United States", code: "US" },
  { name: "Canada", code: "CA" },
  { name: "United Kingdom", code: "UK" },
  { name: "Australia", code: "AU" },
  { name: "Germany", code: "DE" },
  { name: "France", code: "FR" },
  { name: "Spain", code: "ES" },
  { name: "Italy", code: "IT" },
  { name: "Japan", code: "JP" },
  { name: "South Korea", code: "KR" },
  { name: "China", code: "CN" },
  { name: "India", code: "IN" },
  { name: "Brazil", code: "BR" },
  { name: "Mexico", code: "MX" },
  { name: "Russia", code: "RU" },
  { name: "South Africa", code: "ZA" },
  { name: "Egypt", code: "EG" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "Turkey", code: "TR" },
  { name: "Greece", code: "GR" },
  { name: "Sweden", code: "SE" },
  { name: "Norway", code: "NO" },
  { name: "Finland", code: "FI" },
  { name: "Denmark", code: "DK" },
  { name: "Netherlands", code: "NL" },
  { name: "Belgium", code: "BE" },
  { name: "Switzerland", code: "CH" },
  { name: "Austria", code: "AT" },
  { name: "Poland", code: "PL" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Hungary", code: "HU" },
  { name: "Slovakia", code: "SK" },
  { name: "Romania", code: "RO" },
  { name: "Bulgaria", code: "BG" },
  { name: "Ukraine", code: "UA" },
  { name: "Israel", code: "IL" },
  { name: "South Korea", code: "KR" },
  { name: "New Zealand", code: "NZ" },
  { name: "Argentina", code: "AR" },
  { name: "Chile", code: "CL" },
];
