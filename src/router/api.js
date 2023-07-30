module.exports = function (app) {
  const { check } = require("express-validator");
  var AppController = require("../controllers/AppController");
  app.get("/api/all-category", AppController.all_category);
  app.get("/api/product-details", AppController.product_details);
  app.get("/api/product-search", AppController.product_search);
  app.get("/api/filters", AppController.filters);
  app.post("/api/register", AppController.register);
  app.post("/api/login", AppController.login);
  app.post("/api/apply-coupon", AppController.apply_coupon);
  app.get("/api/all-address", AppController.address_list);
  app.post("/api/add-address", AppController.add_address);
  app.post("/api/edit-address", AppController.edit_address);
  app.get("/api/delete-address", AppController.delete_address);
  app.post("/api/checkout", AppController.checkout);
  app.post("/api/checkout-confirm", AppController.checkout_confirm);
  app.get("/api/all-country", AppController.country_list);
  app.get("/api/header-menu", AppController.header_menu);
  app.get("/api/currency", AppController.currency);
  app.get("/api/header-search", AppController.header_search);
  app.get("/api/settings", AppController.settings);
  app.get("/api/category-products", AppController.category_products);
  app.post("/api/emailverify", AppController.verify_your_email);
  app.post(
    "/api/passwrodresetemailsend",
    AppController.send_email_otp_forget_password
  );
  app.post("/api/passwordreset", AppController.reset_your_password);
  app.post("/api/add-to-wish", AppController.add_to_wish);
  app.post("/api/get-wish", AppController.wish_list);
  app.post("/api/add-to-cart", AppController.add_to_cart);
  app.post("/api/get-cart", AppController.cart_list);
  app.post("/api/delete-cart", AppController.delete_cart);
  app.post("/api/delete-wish", AppController.delete_wish);
  app.post("/api/clear-wishlist", AppController.clear_wishlist);
  app.post("/api/clear-cart", AppController.clear_cart);
  app.post("/api/update-cart", AppController.update_cart);
  app.post("/api/add-review", AppController.add_review);
  app.post("/api/get-pg-response", AppController.get_pg_response);
  app.post("/api/get-pg-response2", AppController.get_pg_response2);

  app.post("/api/payment-finalize", AppController.payment_finalize);
  app.get("/api/gift-card", AppController.gift_card);

  app.post("/api/checkout-giftcard", AppController.checkout_giftcard);

  app.post("/api/payment-finalize2", AppController.payment_finalize2);

  app.get("/api/master-category", AppController.master_category);
  app.get("/api/all-brands", AppController.all_brands);
  app.get("/api/all-products", AppController.all_products);

  app.get("/api/wallet-transactions", AppController.wallet_list);
  app.post("/api/applygcard", AppController.applygcard);

  app.get("/api/all-city", AppController.all_city);
  app.get("/api/user-balance", AppController.user_balance);
  app.get("/api/check-shipping", AppController.check_shipping);
  app.post("/api/cancel-order", AppController.cancel_order);
  app.post("/api/return-order", AppController.return_order);
  app.post("/api/deactivate-account", AppController.deactivate_account);
  app.get("/api/blog-detail", AppController.blog_detail);
  app.get("/api/all-blogs", AppController.all_blogs);
  app.get("/api/mobile-home", AppController.mobile_home);
  app.post("/api/mobile-category", AppController.mobile_category);
  app.post("/api/sync-cart", AppController.sync_cart);

  app.get("/api/all-city-list", AppController.all_city_list);
  app.post("/api/login-fb", AppController.login_fb);
  app.post("/api/register-fb", AppController.register_fb);

  app.post("/api/register-google", AppController.register_google);
  app.post("/api/login-google", AppController.login_google);
  app.get("/api/one-brand", AppController.one_brands);

  app.get("/api/extra-filter", AppController.extra_filter);

  app.get("/api/mobile-product-search", AppController.mobile_product_search);

  app.get("/api/fetch-usd", AppController.fetch_usd);

  app.post("/api/update-stock", AppController.update_stock);
  //============ new routs ==================//
  app.post("/api/get-cart-summary", AppController.cart_summary);

  app.get("/api/get_all_countries",AppController.getAllCountries);
  app.get("/api/cities/:countryCode",AppController.getCitiesOfCountry)
};
