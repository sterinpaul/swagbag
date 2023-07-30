const getCartProductSummary = (products) => {
  const summaryProducts =
    products?.length !== 0
      ? products.map((item) => {
          return;
        })
      : [];
  const resFrame = {
    products: [
      {
        name: "product name",
        quantity: 4,
        price: 12,
        total_items_price: 48,
        free_shipping_areas: {
          in_service: null,
          out_service: null,
          international: null,
        },
      },
    ],
    subtotal: null,
    shipping: {
      status: "tobe_calcualte/calculated",
      price: null,
    },
    tax: 0,
    total: 0,
  };
  return resFrame;
};
module.exports = getCartProductSummary;
