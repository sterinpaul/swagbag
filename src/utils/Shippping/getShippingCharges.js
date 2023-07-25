import {
  InServiceAreaShippingChargeCalculator,
  OutServiceAreaShippingChargeCalculator,
} from "./calclulators";
import { InOutServiceKeys, countryLocalOrInternationalKeys } from "./constants";
import {
  countryLocalOrInternationalClassification,
  localInOutServiceController,
} from "./controller";

export const getShippingCharges = ({ area, products }) => {
  const localOrInternationalArea = countryLocalOrInternationalClassification();

  //Logics for local areas
  if (localOrInternationalArea === countryLocalOrInternationalKeys.LOCAL) {
    const serviceType = localInOutServiceController();
    //logic for InService area
    if (serviceType === InOutServiceKeys.IN_SERVICE_AREA) {
      InServiceAreaShippingChargeCalculator({ area, products });
    }
    //logic for Out Service area area
    if (serviceType === InOutServiceKeys.OUT_SERVICE_AREA) {
      OutServiceAreaShippingChargeCalculator({ area, products });
    }
  }
  //Logics for Internationals
  if (
    localOrInternationalArea === countryLocalOrInternationalKeys.INTERNATIONAL
  ) {
  }
};
