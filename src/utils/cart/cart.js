const getCartProductSummary = (products) => {
  const summaryProducts =
    products?.length !== 0
      ? products.map((item) => {
          return {
            name: item.name,
            quantity: item?.quantity,
            price: item?.price,
            total_items_price: item?.quantity * item?.price,
            free_shipping_areas:
              item?.product?.freeShipping === null
                ? null
                : item?.product?.freeShipping,
          };
        })
      : [];

  const subTotal = summaryProducts.reduce(
    (acc, value) => (acc += value.total_items_price),
    0
  );
  const shipping = {
    status: "tobe_calcualte",
    price: 0,
  };
  const tax = 0;
  const total = subTotal + shipping.price + tax;
  const resFrame = {
    products: summaryProducts,
    subtotal: subTotal,
    shipping: shipping,
    tax: tax,
    total: total,
  };
  return resFrame;
};

module.exports = getCartProductSummary;
