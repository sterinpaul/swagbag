export const InServiceAreaShippingChargeCalculator = ({ area, products }) => {
  //Variables are TPV, TWV, SI, C
  // TPV : Threshold price value is set by admin
  // TWV : Threshold Weight value is set by admin
  // SI : Standard shipping service price
  // C : Slab price for every 1 kG
  // W : Actual weight ( Greater weight compared with volume metric weight and weight)
  // EW : Extra weight is TWV - W
  // C : Slab price for 1kg

  //Call a function to check weather the area have free shipping provided by admin
  const areaHasFreeShipping = getAreaHasFreeShipping(areaCode); // ******* To be defined : create this function to get fetch the area has free shipping or no must return boolean
  if (areaHasFreeShipping) {
    return 0;
  }
  const TPV = getTPV(); // ******* To be defined
  const totalChargeAblePrice = getChargeAbleItemsPrice(products); // ******* To be defined

  //Free shipping if totalChargeablePrice is greater than TPV else calculate shipping charge with Actual weight `W`
  if (totalChargeAblePrice >= TPV) {
    return 0;
  } else {
    const W = getChargeAbleItemsWeight(products);
    const TWV = getTWV(); // ******* To be defined
    const SI = getSI(); // ******* To be defined

    //Return standard shipping charge if W is less than TWV else Return SI + Additional charge for additional weight
    if (W <= TWV) {
      return SI;
    } else {
      const EW = W - TWV;
      const C = getC(); // ******* To be defined
      const count = EW / 1;
      const additionCharge = C * count;

      return SI + additionCharge;
    }
  }
};

export const OutServiceAreaShippingChargeCalculator = ({ area, products }) => {
  //Variables are TWV, SI, C
  // TWV : Threshold Weight value is set by admin
  // SI : Standard shipping service price
  // W : Actual weight ( Greater weight compared with volume metric weight and weight)
  // EW : Extra weight is TWV - W
  // CO : Slab price for 1kg

  //Call a function to check weather the area have free shipping provided by admin
  const areaHasFreeShipping = getAreaHasFreeShipping(areaCode); // ******* To be defined : create this function to get fetch the area has free shipping or no must return boolean
  if (areaHasFreeShipping) {
    return 0;
  }

  const W = getChargeAbleItemsWeight(products);
  const TWV = getTWV(); // ******* To be defined
  const SI = getSI(); // ******* To be defined

  //Return standard shipping charge if W is less than TWV else Return SI + Additional charge for additional weight
  if (W <= TWV) {
    return SI;
  } else {
    const EW = W - TWV;
    const CO = getCO(); // ******* To be defined
    const count = EW / 1;
    const additionCharge = CO * count;

    return SI + additionCharge;
  }
};
