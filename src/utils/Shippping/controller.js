const {
  countryLocalOrInternationalKeys,
  InOutServiceKeys,
  countries,
} = require("./constants");

const countryLocalOrInternationalClassification = (shipping_address) => {
  //Check country code is valid
  const isValidCountry = countries.find(
    (item) => item.code === shipping_address.country_code
  );
  if (!isValidCountry) {
    throw new Error("The country code is not matching");
  }
  if (shipping_address?.country_code === "UAE") {
    return countryLocalOrInternationalKeys.LOCAL;
  } else return countryLocalOrInternationalKeys.INTERNATIONAL;
};
const localInOutServiceController = (shipping_address) => {
  if (true) {
    return InOutServiceKeys.IN_SERVICE_AREA;
  } else return InOutServiceKeys.OUT_SERVICE_AREA;
};
const internationalZoneController = () => {
  return;
};
module.exports = {
  countryLocalOrInternationalClassification,
  localInOutServiceController,
  internationalZoneController,
};
