const ShippingVariables = require("../../models/ShippingVariables");

const getShippingVariables = async (area_type) => {
  const document = await ShippingVariables.findOne({ name: area_type });
  if (!document) {
    throw new Error("Something error in shipping validation");
  }
  return document;
};

const getChargeAbleItemsWeight = (products, area_type) => {
  const { total_actual_weight, total_volumetric_weight } = products.reduce(
    (acc, item) => {
      if (!item.free_shipping || item.free_shipping?.[area_type]) {
        return {
          total_actual_weight:
            acc.total_actual_weight + item.total_actual_weight,
          total_volumetric_weight:
            acc.total_volumetric_weight + item.total_volumetric_weight,
        };
      } else return acc;
    },
    { total_actual_weight: 0, total_volumetric_weight: 0 }
  );
  return total_actual_weight >= total_volumetric_weight
    ? total_actual_weight
    : total_volumetric_weight;
};

const getChargeAbleItemsPrice = (products, area_type) => {
  return products.reduce((acc, item) => {
    if (!item.free_shipping || item.free_shipping?.[area_type]) {
      return (acc = +item.total_items_price);
    } else return acc;
  }, 0);
};

const InServiceAreaShippingChargeCalculator = async (
  shipping_address,
  cart_summary
) => {
  //Variables are TPV, TWV, SI, C
  // TPV : Threshold price value is set by admin
  // TWV : Threshold Weight value is set by admin
  // SI : Standard shipping service price
  // C : Slab price for every 1 kG
  // W : Actual weight ( Greater weight compared with volume metric weight and weight)
  // EW : Extra weight is TWV - W
  // C : Slab price for 1kg

  //Call a function to check weather the area have free shipping provided by admin
  const {
    free_shipping: areaHasFreeShipping,
    TWV,
    SI,
    SP,
    TPV,
  } = await getShippingVariables("in_service"); // ******* To be defined : create this function to get fetch the area has free shipping or no must return boolean
  if (areaHasFreeShipping) {
    return {
      ...cart_summary,
      shipping: {
        price: 0,
        status: "calculated",
        message: "Free Shipping for in service area set by admin",
      },
      service_area: "in_service",
      area_type: "local",
    };
  }
  const totalChargeAblePrice = getChargeAbleItemsPrice(
    cart_summary.products,
    "in_service"
  );

  //Free shipping if totalChargeablePrice is greater than TPV else calculate shipping charge with Actual weight `W`
  if (totalChargeAblePrice >= TPV) {
    return {
      ...cart_summary,
      shipping: {
        price: 0,
        status: "calculated",
        message:
          "Free shipping activated when Total chargeable price is greater than Threshold price value",
      },
      service_area: "in_service",
      area_type: "local",
    };
  } else {
    // const W = getChargeAbleItemsWeight(cart_summary.products, "in_service");
    const W = 18;

    //Return standard shipping charge if W is less than TWV else Return SI + Additional charge for additional weight
    if (W <= TWV) {
      return {
        ...cart_summary,
        shipping: {
          price: SI,
          status: "calculated",
          message: "Standard shipping charge " + SI + " applied",
        },
        total: cart_summary.total + SI,
        service_area: "in_service",
        area_type: "local",
      };
    } else {
      const EW = W - TWV;
      const count = EW / 1;
      const additionCharge = SP * count;
      const total_shipping_charge = SI + additionCharge;

      return {
        ...cart_summary,
        shipping: {
          price: total_shipping_charge,
          status: "calculated",
          message:
            "Extra weight charge " +
            additionCharge +
            " standard shipping charge " +
            SI +
            " = " +
            total_shipping_charge +
            " applied",
        },
        total: cart_summary.total + total_shipping_charge,
        service_area: "in_service",
        area_type: "local",
      };
    }
  }
};

const OutServiceAreaShippingChargeCalculator = async (
  shipping_address,
  cart_summary
) => {
  console.log("OutServiceAreaShippingChargeCalculator");
  //Variables are TWV, SI, C
  // TWV : Threshold Weight value is set by admin
  // SI : Standard shipping service price
  // W : Actual weight ( Greater weight compared with volume metric weight and weight)
  // EW : Extra weight is TWV - W
  // SP : Slab price for 1kg

  //Call a function to check weather the area have free shipping provided by admin
  const {
    free_shipping: areaHasFreeShipping,
    TWV,
    SI,
    SP,
  } = await getShippingVariables("out_service");
  if (areaHasFreeShipping) {
    return {
      ...cart_summary,
      shipping: {
        price: 0,
        status: "calculated",
        message: "Free Shipping for out service area set by admin",
      },
      service_area: "out_service",
      area_type: "local",
    };
  }

  const W = getChargeAbleItemsWeight(cart_summary.products, "out_service");

  //Return standard shipping charge if W is less than TWV else Return SI + Additional charge for additional weight
  if (W <= TWV) {
    return {
      ...cart_summary,
      shipping: {
        price: SI,
        status: "calculated",
        message: "Standard shipping charge " + SI + " applied",
      },
      total: cart_summary.total + SI,
      service_area: "out_service",
      area_type: "local",
    };
  } else {
    const EW = W - TWV;
    const count = EW / 1;
    const additionCharge = SP * count;
    const total_shipping_charge = SI + additionCharge;

    return {
      ...cart_summary,
      shipping: {
        price: total_shipping_charge,
        status: "calculated",
        message:
          "Extra weight + standard shipping charge " +
          total_shipping_charge +
          " applied",
      },
      total: cart_summary.total + total_shipping_charge,
      service_area: "out_service",
      area_type: "local",
    };
  }
};

module.exports = {
  OutServiceAreaShippingChargeCalculator,
  InServiceAreaShippingChargeCalculator,
};
