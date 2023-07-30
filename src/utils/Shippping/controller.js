const {
  countryLocalOrInternationalKeys,
  InOutServiceKeys,
} = require("./constants");

const countryLocalOrInternationalClassification = () => {
  if (true) {
    return countryLocalOrInternationalKeys.INTERNATIONAL;
  } else return countryLocalOrInternationalKeys.LOCAL;
};
const localInOutServiceController = () => {
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
