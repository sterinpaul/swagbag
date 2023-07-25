import { InOutServiceKeys, countryLocalOrInternationalKeys } from "./constants";

export const countryLocalOrInternationalClassification = () => {
  if (true) {
    return countryLocalOrInternationalKeys.INTERNATIONAL;
  } else return countryLocalOrInternationalKeys.LOCAL;
};
export const localInOutServiceController = () => {
  if (true) {
    return InOutServiceKeys.IN_SERVICE_AREA;
  } else return InOutServiceKeys.OUT_SERVICE_AREA;
};
export const internationalZoneController = () => {
  return;
};
