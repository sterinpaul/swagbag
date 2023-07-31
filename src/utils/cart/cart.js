const getCartProductSummary = (products) => {
  const summaryProducts =
    products?.length !== 0
      ? products.map((item) => {
          const actual_weight = item?.product?.weight || 0;
          const volumetric_weight =
            (item?.product?.height *
              item?.product?.width *
              item?.product?.length) /
            5000;
          const total_actual_weight = actual_weight * item?.quantity;
          const total_volumetric_weight = volumetric_weight * item?.quantity;
          const final_weight =
            total_actual_weight >= total_volumetric_weight
              ? total_actual_weight
              : total_volumetric_weight;
          return {
            name: item.name,
            quantity: item?.quantity,
            price: item?.price,
            total_items_price: item?.quantity * item?.price,
            free_shipping_areas:
              item?.product?.freeShipping === null
                ? null
                : item?.product?.freeShipping,
            actual_weight: actual_weight,
            volumetric_weight: volumetric_weight,
            total_actual_weight: total_actual_weight,
            total_volumetric_weight: total_volumetric_weight,
          };
        })
      : [];

  const subTotal = summaryProducts.reduce(
    (acc, value) => (acc += value.total_items_price),
    0
  );
  const shipping = {
    status: "to_calculate",
    price: 0,
    message: "shipping price only calculated after entering shipping details",
  };
  const tax = 0;
  const total = subTotal + shipping.price + tax;
  const resFrame = {
    products: summaryProducts,
    subtotal: subTotal,
    shipping: shipping,
    tax: tax,
    total: total,
    service_area: "not defined by user",
    area_type: "not defined by user",
  };
  return resFrame;
};

module.exports = { getCartProductSummary };
