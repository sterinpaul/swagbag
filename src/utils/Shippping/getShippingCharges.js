const {
  InServiceAreaShippingChargeCalculator,
  OutServiceAreaShippingChargeCalculator,
} = require("./calclulators");

const {
  countryLocalOrInternationalKeys,
  InOutServiceKeys,
} = require("./constants");

const {
  countryLocalOrInternationalClassification,
  internationalZoneController,
  localInOutServiceController,
} = require("./controller");

const getShippingCharges = async (shipping_address, cart_summary) => {
  const localOrInternationalArea =
    countryLocalOrInternationalClassification(shipping_address);
  //Logics for local areas
  if (localOrInternationalArea === countryLocalOrInternationalKeys.LOCAL) {
    const serviceType = await localInOutServiceController(shipping_address);
    //logic for InService area
    if (serviceType === InOutServiceKeys.IN_SERVICE_AREA) {
      return await InServiceAreaShippingChargeCalculator(
        shipping_address,
        cart_summary
      );
    }
    //logic for Out Service area area
    if (serviceType === InOutServiceKeys.OUT_SERVICE_AREA) {
      return await OutServiceAreaShippingChargeCalculator(
        shipping_address,
        cart_summary
      );
    }
  }
  //Logics for Internationals
  if (
    localOrInternationalArea === countryLocalOrInternationalKeys.INTERNATIONAL
  ) {
  }
};
module.exports = { getShippingCharges };
