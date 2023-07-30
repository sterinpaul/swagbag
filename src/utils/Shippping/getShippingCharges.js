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

const getShippingCharges = (shipping_address, products) => {
  const localOrInternationalArea = countryLocalOrInternationalClassification();

  //Logics for local areas
  if (localOrInternationalArea === countryLocalOrInternationalKeys.LOCAL) {
    const serviceType = localInOutServiceController();
    //logic for InService area
    if (serviceType === InOutServiceKeys.IN_SERVICE_AREA) {
      InServiceAreaShippingChargeCalculator({ shipping_address, products });
    }
    //logic for Out Service area area
    if (serviceType === InOutServiceKeys.OUT_SERVICE_AREA) {
      OutServiceAreaShippingChargeCalculator({ shipping_address, products });
    }
  }
  //Logics for Internationals
  if (
    localOrInternationalArea === countryLocalOrInternationalKeys.INTERNATIONAL
  ) {
  }
};
module.exports = { getShippingCharges };
