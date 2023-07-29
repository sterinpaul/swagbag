const shippingController = require("../controllers/shippingController");

module.exports = function (app) {
  var AdminController = require("../controllers/AdminController");
  var AdminController = require("../controllers/AdminController");

  const multer = require("multer");
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + "." + "zip");
    },
  });

  var upload = multer({ storage: storage });

  const { check } = require("express-validator");
  const jwt = require("jsonwebtoken");
  const JWT_SECRET = "krishna";

  function generateAccessToken(key) {
    // expires after half and hour (1800 seconds = 30 minutes)
    const accessToken = jwt.sign({ mobile: key }, JWT_SECRET, {
      expiresIn: "180000s",
    });
    return accessToken;
  }

  function authenticateToken(req, res, next) {
    next();
    //const JWT_SECRET = process.env.JWT_SECRET;
    // Gather the jwt access token from the request header
    //const authHeader = req.headers["authorization"];
    //const token = authHeader && authHeader.split(" ")[0];
    //console.log(authHeader.split(' '));
    // if (token == null) return res.sendStatus(200); // if there isn't any token

    // jwt.verify(token, JWT_SECRET, (err, mobile) => {
    //     if (err) return res.sendStatus(200);
    //     req.token = generateAccessToken(mobile);
    //     next(); // pass the execution off to whatever request the client intended
    // });
  }

  app

    /// User Start ////

    .post(
      "/admin/login",
      [
        check("email")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter email address"),
        check("password")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter password"),
      ],
      AdminController.login
    )

    .post(
      "/admin/create-user",
      [
        check("full_name")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter name"),
        check("email")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter email address"),
        check("mobile")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter mobile number"),
        check("password")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter password"),
        check("user_type")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter user type"),
      ],
      authenticateToken,
      AdminController.create_user
    )

    .post("/admin/user-list", [], authenticateToken, AdminController.user_list)

    .post(
      "/admin/update-user-status",
      [],
      authenticateToken,
      AdminController.update_user_status
    )

    .post(
      "/admin/send-email-otp",
      [
        check("email")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter email address"),
      ],
      AdminController.send_email_otp
    )

    .post(
      "/admin/login-with-otp",
      [
        check("mobile")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter mobile number"),
        check("otp").trim().isLength({ min: 1 }).withMessage("Enter OTP"),
      ],
      AdminController.otp_login
    )

    .post(
      "/admin/reset-password",
      [
        check("email")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter email address"),
      ],
      AdminController.reset_password
    )

    .post(
      "/admin/chnage-password",
      [
        check("email")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter email address"),
        check("otp").trim().isLength({ min: 1 }).withMessage("Enter OTP"),
        check("password")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter password"),
      ],
      AdminController.chnage_password
    )

    .post(
      "/admin/get-profile",
      [],
      authenticateToken,
      AdminController.get_profile
    )

    .post(
      "/admin/update-profile",
      [
        check("id").trim().isLength({ min: 1 }).withMessage("Enter id"),
        check("full_name")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter name"),
      ],
      authenticateToken,
      AdminController.update_profile
    )

    .post(
      "/admin/delete-user",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter user id")],
      authenticateToken,
      AdminController.delete_user
    )

    .post(
      "/admin/update-profile-image",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter id")],
      authenticateToken,
      AdminController.update_profile_image
    )
    ///// Users End ///////

    /// City Start ///

    .post(
      "/admin/create-city",
      [
        //check('name').trim().isLength({ min: 1 }).withMessage('Enter city name')
      ],
      authenticateToken,
      AdminController.create_city
    )

    .post("/admin/city-list", [], authenticateToken, AdminController.city_list)

    .post(
      "/admin/update-city-status",
      [],
      authenticateToken,
      AdminController.update_city_status
    )

    .post(
      "/admin/update-city-status-default",
      [],
      authenticateToken,
      AdminController.update_city_status_default
    )

    .post(
      "/admin/update-city-footer-status",
      [],
      authenticateToken,
      AdminController.update_city_footer_status
    )

    .post(
      "/admin/get-single-city",
      [],
      authenticateToken,
      AdminController.get_city
    )

    .post(
      "/admin/update-city",
      [
        // check('id').trim().isLength({ min: 1 }).withMessage('Enter city id'),
        //check('name').trim().isLength({ min: 1 }).withMessage('Enter city name'),
      ],
      authenticateToken,
      AdminController.update_city
    )

    .post(
      "/admin/delete-city",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter city id")],
      authenticateToken,
      AdminController.delete_city
    )

    /// City End ///

    /// Zip code Start ///

    .post(
      "/admin/all-city-list",
      [],
      authenticateToken,
      AdminController.all_city_list
    )

    .post(
      "/admin/create-zipcode",
      [
        check("name")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter city name"),
        check("city").trim().isLength({ min: 1 }).withMessage("Select city"),
      ],
      authenticateToken,
      AdminController.create_zipcode
    )

    .post(
      "/admin/zipcode-list",
      [],
      authenticateToken,
      AdminController.zipcode_list
    )

    .post(
      "/admin/update-zipcode-status",
      [],
      authenticateToken,
      AdminController.update_zipcode_status
    )

    .post(
      "/admin/get-single-zipcode",
      [],
      authenticateToken,
      AdminController.get_zipcode
    )

    .post(
      "/admin/update-zipcode",
      [
        check("id").trim().isLength({ min: 1 }).withMessage("Enter zipcode id"),
        check("name")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter zipcode name"),
        check("city").trim().isLength({ min: 1 }).withMessage("Select city"),
      ],
      authenticateToken,
      AdminController.update_zipcode
    )

    .post(
      "/admin/delete-zipcode",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter zipcode id")],
      authenticateToken,
      AdminController.delete_zipcode
    )

    /// Zip code End ///

    /// Cusine Start ///

    .post(
      "/admin/create-cuisine",
      [
        check("name")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter cuisine name"),
      ],
      authenticateToken,
      AdminController.create_cuisine
    )

    .post(
      "/admin/cuisine-list",
      [],
      authenticateToken,
      AdminController.cuisine_list
    )

    .post(
      "/admin/update-cuisine-status",
      [],
      authenticateToken,
      AdminController.update_cuisine_status
    )

    .post(
      "/admin/get-single-cuisine",
      [],
      authenticateToken,
      AdminController.get_cuisine
    )

    .post(
      "/admin/update-cuisine",
      [
        check("id").trim().isLength({ min: 1 }).withMessage("Enter cuisine id"),
        check("name")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter cuisine name"),
      ],
      authenticateToken,
      AdminController.update_cuisine
    )

    .post(
      "/admin/delete-cuisine",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter cuisine id")],
      authenticateToken,
      AdminController.delete_cuisine
    )

    /// Cusine End ///

    /// Category Start ////

    .post(
      "/admin/parent-category-list",
      [],
      authenticateToken,
      AdminController.parent_category_list
    )

    .post(
      "/admin/add-category",
      [
        //check('name').trim().isLength({ min: 1 }).withMessage('Enter category name id'),
      ],
      authenticateToken,
      AdminController.add_category
    )

    .post(
      "/admin/category-list",
      [],
      authenticateToken,
      AdminController.category_list
    )

    .post(
      "/admin/update-category-status",
      [],
      authenticateToken,
      AdminController.update_category_status
    )

    .post(
      "/admin/get-single-category",
      [],
      authenticateToken,
      AdminController.get_category
    )

    .post(
      "/admin/delete-category",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter category id"),
      ],
      authenticateToken,
      AdminController.delete_category
    )

    .post(
      "/admin/update-category",
      [],
      authenticateToken,
      AdminController.update_category
    )

    /// Category End ////

    /// Brand Start ////

    .post(
      "/admin/add-brand",
      [
        //check('name').trim().isLength({ min: 1 }).withMessage('Enter category name id'),
      ],
      authenticateToken,
      AdminController.add_brand
    )

    .post(
      "/admin/brand-list",
      [],
      authenticateToken,
      AdminController.brand_list
    )

    .post(
      "/admin/update-brand-status",
      [],
      authenticateToken,
      AdminController.update_brand_status
    )

    .post(
      "/admin/update-brand",
      [],
      authenticateToken,
      AdminController.update_brand
    )

    .post(
      "/admin/get-single-brand",
      [],
      authenticateToken,
      AdminController.get_brand
    )

    .post(
      "/admin/delete-brand",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter brand id")],
      authenticateToken,
      AdminController.delete_brand
    )

    /// Brand End ////

    /// Vendor Start ////

    .post(
      "/admin/add-vendor",
      [
        //check('name').trim().isLength({ min: 1 }).withMessage('Enter category name id'),
      ],
      authenticateToken,
      AdminController.add_vendor
    )

    .post(
      "/admin/vendor-list",
      [],
      authenticateToken,
      AdminController.vendor_list
    )

    .post(
      "/admin/update-vendor-status",
      [],
      authenticateToken,
      AdminController.update_vendor_status
    )

    .post(
      "/admin/update-vendor",
      [],
      authenticateToken,
      AdminController.update_vendor
    )

    .post(
      "/admin/get-single-vendor",
      [],
      authenticateToken,
      AdminController.get_vendor
    )

    .post(
      "/admin/delete-vendor",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter vendor id")],
      authenticateToken,
      AdminController.delete_vendor
    )

    /// Vendor End ////

    ///// Settings Start ////////
    .post(
      "/admin/settings-list",
      [],
      authenticateToken,
      AdminController.settings_list
    )

    .post(
      "/admin/app-settings-list",
      [],
      authenticateToken,
      AdminController.app_settings_list
    )

    .post(
      "/admin/get-settings",
      [],
      authenticateToken,
      AdminController.get_settings
    )

    .post(
      "/admin/update-settings",
      [],
      authenticateToken,
      AdminController.update_settings
    )

    .post(
      "/admin/update-app-settings",
      [],
      authenticateToken,
      AdminController.update_app_settings
    )

    .get("/admin/settings", [], AdminController.settings)

    /////// Settings End /////////

    /// Product Start ////

    .post(
      "/admin/parent-category-list",
      [],
      authenticateToken,
      AdminController.parent_category_list
    )

    .post(
      "/admin/sub-category-list",

      authenticateToken,
      AdminController.sub_category_list
    )

    .post(
      "/admin/add-product",
      [
        //check('name').trim().isLength({ min: 1 }).withMessage('Enter category name id'),
      ],
      authenticateToken,
      AdminController.add_product
    )

    .post(
      "/admin/product-list",
      [],
      authenticateToken,
      AdminController.product_list
    )

    .post(
      "/admin/update-product-status",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter product id")],
      authenticateToken,
      AdminController.update_product_status
    )

    .post(
      "/admin/get-single-product",
      [],
      authenticateToken,
      AdminController.get_product
    )

    .post(
      "/admin/delete-product",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter product id")],
      authenticateToken,
      AdminController.delete_product
    )

    .post(
      "/admin/update-product",
      [],
      authenticateToken,
      AdminController.update_product
    )

    .post(
      "/admin/all-product-list",
      [],
      authenticateToken,
      AdminController.all_product_list
    )

    .post(
      "/admin/all-cuisine-list",
      [],
      authenticateToken,
      AdminController.all_cuisine_list
    )

    .post(
      "/admin/all-brand-list",
      [],
      authenticateToken,
      AdminController.all_brand_list
    )

    .post(
      "/admin/all-vendor-list",
      [],
      authenticateToken,
      AdminController.all_vendor_list
    )

    .post(
      "/admin/delete-product-image",
      [],
      authenticateToken,
      AdminController.delete_product_image
    )

    /// Product End ////

    /// Pickup Partner Start ////

    .post(
      "/admin/add-pickup-partner",
      [check("mobile").trim().isLength({ min: 1 }).withMessage("Enter mobile")],
      authenticateToken,
      AdminController.add_pickup_partner
    )

    .post(
      "/admin/pickup-partner-list",
      [],
      authenticateToken,
      AdminController.pickup_partner_list
    )

    .post(
      "/admin/update-pickup-partner-status",
      [],
      authenticateToken,
      AdminController.update_pickup_partner_status
    )

    .post(
      "/admin/update-pickup-partner",
      [
        // check('first_name').trim().isLength({ min: 1 }).withMessage('Enter first_name'),
        // check('last_name').trim().isLength({ min: 1 }).withMessage('Enter last_name'),
        check("mobile").trim().isLength({ min: 1 }).withMessage("Enter mobile"),
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter pickup partner id"),
      ],
      authenticateToken,
      AdminController.update_pickup_partner
    )

    .post(
      "/admin/get-single-pickup-partner",
      [],
      authenticateToken,
      AdminController.get_pickup_partner
    )

    .post(
      "/admin/delete-pickup-partner",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter pickup partner id"),
      ],
      authenticateToken,
      AdminController.delete_pickup_partner
    )

    /// Pickup Partner End ////

    /// Cargo Partner Start ////

    .post(
      "/admin/add-cargo-partner",
      [check("mobile").trim().isLength({ min: 1 }).withMessage("Enter mobile")],
      authenticateToken,
      AdminController.add_cargo_partner
    )

    .post(
      "/admin/cargo-partner-list",
      [],
      authenticateToken,
      AdminController.cargo_partner_list
    )

    .post(
      "/admin/update-cargo-partner-status",
      [],
      authenticateToken,
      AdminController.update_cargo_partner_status
    )

    .post(
      "/admin/update-cargo-partner",
      [
        check("mobile").trim().isLength({ min: 1 }).withMessage("Enter mobile"),
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter cargo partner id"),
      ],
      authenticateToken,
      AdminController.update_cargo_partner
    )

    .post(
      "/admin/get-single-cargo-partner",
      [],
      authenticateToken,
      AdminController.get_cargo_partner
    )

    .post(
      "/admin/delete-cargo-partner",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter cargo partner id"),
      ],
      authenticateToken,
      AdminController.delete_cargo_partner
    )

    /// Cargo Partner End ////

    /// Cargo Partner Start ////

    .post(
      "/admin/add-delivery-partner",
      [check("mobile").trim().isLength({ min: 1 }).withMessage("Enter mobile")],
      authenticateToken,
      AdminController.add_delivery_partner
    )

    .post(
      "/admin/delivery-partner-list",
      [],
      authenticateToken,
      AdminController.delivery_partner_list
    )

    .post(
      "/admin/update-delivery-partner-status",
      [],
      authenticateToken,
      AdminController.update_delivery_partner_status
    )

    .post(
      "/admin/update-delivery-partner",
      [
        check("mobile").trim().isLength({ min: 1 }).withMessage("Enter mobile"),
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter delivery partner id"),
      ],
      authenticateToken,
      AdminController.update_delivery_partner
    )

    .post(
      "/admin/get-single-delivery-partner",
      [],
      authenticateToken,
      AdminController.get_delivery_partner
    )

    .post(
      "/admin/delete-delivery-partner",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter delivery partner id"),
      ],
      authenticateToken,
      AdminController.delete_delivery_partner
    )

    /// Cargo Partner End ////

    /// Cut off time Start ////

    .post(
      "/admin/add-cutoff-time",
      [check("mobile").trim().isLength({ min: 1 }).withMessage("Enter mobile")],
      authenticateToken,
      AdminController.add_cutoff_time
    )

    .post(
      "/admin/cutoff-time-list",
      [],
      authenticateToken,
      AdminController.cutoff_time_list
    )

    .post(
      "/admin/update-cutoff-time-status",
      [],
      authenticateToken,
      AdminController.update_cutoff_time_status
    )

    .post(
      "/admin/update-cutoff-time",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter delivery partner id"),
      ],
      authenticateToken,
      AdminController.update_cutoff_time
    )

    .post(
      "/admin/get-single-cutoff-time",
      [],
      authenticateToken,
      AdminController.get_cutoff_time
    )

    .post(
      "/admin/delete-cutoff-time",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter delivery partner id"),
      ],
      authenticateToken,
      AdminController.delete_cutoff_time
    )

    /// Cut off time End ////

    /// Slider Start ////

    .post(
      "/admin/add-slider",
      [
        //check('name').trim().isLength({ min: 1 }).withMessage('Enter category name id'),
      ],
      authenticateToken,
      AdminController.add_slider
    )

    .post(
      "/admin/slider-list",
      [],
      authenticateToken,
      AdminController.slider_list
    )

    .post(
      "/admin/update-slider-status",
      [],
      authenticateToken,
      AdminController.update_slider_status
    )

    .post(
      "/admin/update-slider",
      [],
      authenticateToken,
      AdminController.update_slider
    )

    .post(
      "/admin/get-single-slider",
      [],
      authenticateToken,
      AdminController.get_slider
    )

    .post(
      "/admin/delete-slider",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter slider id")],
      authenticateToken,
      AdminController.delete_slider
    )

    /// Slider End ////

    /// Mobile Category Start ////

    .post(
      "/admin/mobile-category-list",
      [],
      authenticateToken,
      AdminController.mobile_category_list
    )

    .post(
      "/admin/update-category-slider",
      [],
      authenticateToken,
      AdminController.update_mobile_category
    )

    .post(
      "/admin/get-single-category-slider",
      [],
      authenticateToken,
      AdminController.get_mobile_category
    )

    /// Mobile Category End ////

    /// Product Type Start ////

    .post(
      "/admin/add-product-type",
      [
        //check('name').trim().isLength({ min: 1 }).withMessage('Enter category name id'),
      ],
      authenticateToken,
      AdminController.add_product_type
    )

    .post(
      "/admin/product-type-list",
      [],
      authenticateToken,
      AdminController.product_type_list
    )

    .post(
      "/admin/update-product-type-status",
      [],
      authenticateToken,
      AdminController.update_product_type_status
    )

    .post(
      "/admin/update-product-type",
      [],
      authenticateToken,
      AdminController.update_product_type
    )

    .post(
      "/admin/get-single-product-type",
      [],
      authenticateToken,
      AdminController.get_product_type
    )

    .post(
      "/admin/all-product-type-list",
      [],
      authenticateToken,
      AdminController.all_product_type_list
    )

    .post(
      "/admin/delete-product-type",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter product type id"),
      ],
      authenticateToken,
      AdminController.delete_product_type
    )

    /// Product Type End ////

    /// Coupon Start ////

    .post(
      "/admin/add-coupon",
      [],
      authenticateToken,
      AdminController.add_coupon
    )

    .post(
      "/admin/coupon-list",
      [],
      authenticateToken,
      AdminController.coupon_list
    )

    .post(
      "/admin/update-coupon-status",
      [],
      authenticateToken,
      AdminController.update_coupon_status
    )

    .post(
      "/admin/update-coupon",
      [],
      authenticateToken,
      AdminController.update_coupon
    )

    .post(
      "/admin/get-single-coupon",
      [],
      authenticateToken,
      AdminController.get_coupon
    )

    .post(
      "/admin/delete-coupon",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter delivery partner id"),
      ],
      authenticateToken,
      AdminController.delete_coupon
    )

    /// Coupon End ////

    /// LP Head Start ///

    .post(
      "/admin/add-lp-head",
      [],
      authenticateToken,
      AdminController.add_lp_head
    )

    .post(
      "/admin/lp-head-list",
      [],
      authenticateToken,
      AdminController.lp_head_list
    )

    .post(
      "/admin/update-lp-head-status",
      [],
      authenticateToken,
      AdminController.update_lp_head_status
    )

    .post(
      "/admin/update-lp-head",
      [],
      authenticateToken,
      AdminController.update_lp_head
    )

    .post(
      "/admin/get-single-lp-head",
      [],
      authenticateToken,
      AdminController.get_lp_head
    )

    .post(
      "/admin/delete-li-head",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter vendor id")],
      authenticateToken,
      AdminController.delete_lp_head
    )

    /// LP Head End ///

    /// LP Head Start ///

    .post(
      "/admin/add-lp-manager",
      [],
      authenticateToken,
      AdminController.add_lp_manager
    )

    .post(
      "/admin/lp-manager-list",
      [],
      authenticateToken,
      AdminController.lp_manager_list
    )

    .post(
      "/admin/update-lp-manager-status",
      [],
      authenticateToken,
      AdminController.update_lp_manager_status
    )

    .post(
      "/admin/update-lp-manager",
      [],
      authenticateToken,
      AdminController.update_lp_manager
    )

    .post(
      "/admin/get-single-lp-manager",
      [],
      authenticateToken,
      AdminController.get_lp_manager
    )

    .post(
      "/admin/delete-li-manager",
      [],
      authenticateToken,
      AdminController.delete_lp_manager
    )

    /// LP Head End ///

    /// Pickup Boy Start ////

    .post(
      "/admin/all-delivery-partner-list",
      [],
      authenticateToken,
      AdminController.all_delivery_partner_list
    )

    .post(
      "/admin/all-pickup-partner-list",
      [],
      authenticateToken,
      AdminController.all_pickup_partner_list
    )

    .post(
      "/admin/add-pickup-boy",
      [check("mobile").trim().isLength({ min: 1 }).withMessage("Enter mobile")],
      authenticateToken,
      AdminController.add_pickup_boy
    )

    .post(
      "/admin/pickup-boy-list",
      [],
      authenticateToken,
      AdminController.pickup_boy_list
    )

    .post(
      "/admin/update-pickup-boy-status",
      [],
      authenticateToken,
      AdminController.update_pickup_boy_status
    )

    .post(
      "/admin/update-pickup-boy",
      [
        check("mobile").trim().isLength({ min: 1 }).withMessage("Enter mobile"),
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter pickup boy id"),
      ],
      authenticateToken,
      AdminController.update_pickup_boy
    )

    .post(
      "/admin/get-single-pickup-boy",
      [],
      authenticateToken,
      AdminController.get_pickup_boy
    )

    .post(
      "/admin/delete-pickup-boy",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter pickup boy id"),
      ],
      authenticateToken,
      AdminController.delete_pickup_boy
    )

    /// Pickup Boy End ////

    /// Pickup Boy Start ////

    .post(
      "/admin/add-delivery-boy",
      [check("mobile").trim().isLength({ min: 1 }).withMessage("Enter mobile")],
      authenticateToken,
      AdminController.add_delivery_boy
    )

    .post(
      "/admin/delivery-boy-list",
      [],
      authenticateToken,
      AdminController.delivery_boy_list
    )

    .post(
      "/admin/update-delivery-boy-status",
      [],
      authenticateToken,
      AdminController.update_delivery_boy_status
    )

    .post(
      "/admin/update-delivery-boy",
      [
        check("mobile").trim().isLength({ min: 1 }).withMessage("Enter mobile"),
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter delivery boy id"),
      ],
      authenticateToken,
      AdminController.update_delivery_boy
    )

    .post(
      "/admin/get-single-delivery-boy",
      [],
      authenticateToken,
      AdminController.get_delivery_boy
    )

    .post(
      "/admin/delete-delivery-boy",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter delivery boy id"),
      ],
      authenticateToken,
      AdminController.delete_delivery_boy
    )

    /// Pickup Boy End ////

    /// Review Start ////
    .post(
      "/admin/review-list",
      [],
      authenticateToken,
      AdminController.review_list
    )

    .post(
      "/admin/update-review-status",
      [],
      authenticateToken,
      AdminController.update_review_status
    )

    .post(
      "/admin/delete-review",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter review id")],
      authenticateToken,
      AdminController.delete_review
    )
    /// Review End ////

    .post("/admin/lp-list", [], authenticateToken, AdminController.lp_list)

    .post(
      "/admin/delivery-list",
      [],
      authenticateToken,
      AdminController.delivery_list
    )

    /// Admin User Start ////

    .post(
      "/admin/add-user",
      [
        //check('name').trim().isLength({ min: 1 }).withMessage('Enter category name id'),
      ],
      authenticateToken,
      AdminController.add_user
    )

    .post(
      "/admin/vendor-list",
      [],
      authenticateToken,
      AdminController.vendor_list
    )

    .post(
      "/admin/update-vendor-status",
      [],
      authenticateToken,
      AdminController.update_vendor_status
    )

    .post(
      "/admin/update-vendor",
      [],
      authenticateToken,
      AdminController.update_vendor
    )

    .post(
      "/admin/get-single-vendor",
      [],
      authenticateToken,
      AdminController.get_vendor
    )

    .post(
      "/admin/delete-vendor",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter vendor id")],
      authenticateToken,
      AdminController.delete_vendor
    )

    /// Admin User End ////

    .post(
      "/admin/get-user-data",
      [],
      authenticateToken,
      AdminController.get_user_data
    )

    .post(
      "/admin/all-brand-list",
      [],
      authenticateToken,
      AdminController.all_brand_list
    )

    .post(
      "/admin/all-category-list",
      [],
      authenticateToken,
      AdminController.all_category_list
    )

    .post(
      "/admin/all-product-list",
      [],
      authenticateToken,
      AdminController.all_product_list
    )

    .post(
      "/admin/all-customer-list",
      [],
      authenticateToken,
      AdminController.all_customer_list
    )

    /// Shipping Start ///

    .post(
      "/admin/create-shipping",
      [
        check("name")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter shipping name"),
      ],
      authenticateToken,
      AdminController.create_shipping
    )

    .post(
      "/admin/shipping-list",
      [],
      authenticateToken,
      AdminController.shipping_list
    )

    .post(
      "/admin/update-shipping-status",
      [],
      authenticateToken,
      AdminController.update_shipping_status
    )

    .post(
      "/admin/get-single-shipping",
      [],
      authenticateToken,
      AdminController.get_shipping
    )

    .post(
      "/admin/update-shipping",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter shipping id"),
        check("name")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter shipping name"),
      ],
      authenticateToken,
      AdminController.update_shipping
    )

    .post(
      "/admin/delete-shipping",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter shipping id"),
      ],
      authenticateToken,
      AdminController.delete_shipping
    )

    .post(
      "/admin/all-shipping-class",
      [],
      authenticateToken,
      AdminController.all_shipping_class
    )

    /// Shipping End ///

    .get("/admin/state-list", AdminController.state_list)

    .post(
      "/admin/update-customer-status",
      [],
      authenticateToken,
      AdminController.update_customer_status
    )

    .post(
      "/admin/customer-list",
      [],
      authenticateToken,
      AdminController.customer_list
    )

    .post(
      "/admin/order-list",
      [],
      authenticateToken,
      AdminController.order_list
    )

    .post(
      "/admin/update-gateway-status",
      [],
      authenticateToken,
      AdminController.update_gateway
    )

    .post(
      "/admin/update-order-status",
      [],
      authenticateToken,
      AdminController.update_order_status
    )

    .post(
      "/admin/order-delete",
      [],
      authenticateToken,
      AdminController.order_delete
    )

    .post(
      "/admin/update-order-date",
      [],
      authenticateToken,
      AdminController.update_order_date
    )

    .post(
      "/admin/update-order-slot",
      [],
      authenticateToken,
      AdminController.update_order_slot
    )

    .post(
      "/admin/customer-address-list",
      [],
      authenticateToken,
      AdminController.customer_address_list
    )

    .post(
      "/admin/update-customer",
      [
        check("id").trim().isLength({ min: 1 }).withMessage("Enter id"),
        check("full_name")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter name"),
      ],
      authenticateToken,
      AdminController.update_customer
    )

    .post(
      "/admin/update-customer-cod",
      [],
      authenticateToken,
      AdminController.update_customer_cod_status
    )

    .post(
      "/admin/update-customer-order-status",
      [],
      authenticateToken,
      AdminController.update_customer_order_status
    )

    .post(
      "/admin/add_order_note",
      [],
      authenticateToken,
      AdminController.add_order_note
    )

    .post(
      "/admin/order_note_list",
      [],
      authenticateToken,
      AdminController.order_note_list
    )

    .get(
      "/admin/approve_order_vendor",
      [],
      AdminController.approve_order_vendor
    )

    .get("/admin/send_order_invoice", [], AdminController.send_order_invoice)

    .post(
      "/admin/bulk-order-list",
      [],
      authenticateToken,
      AdminController.bulk_order_list
    )

    .post(
      "/admin/update-bulk-order-status",
      [],
      authenticateToken,
      AdminController.update_bulk_order_status
    )

    .post("/admin/send-otp", AdminController.send_otp)
    .get("/admin/send_email_template", AdminController.send_email_template)
    .post("/admin/get_map_data", AdminController.get_map_data)

    .post(
      "/admin/update-pickup-boy-status-login",
      [],
      authenticateToken,
      AdminController.update_pickup_boy_status_login
    )

    .post(
      "/admin/update-delivery-boy-status-login",
      [],
      authenticateToken,
      AdminController.update_delivery_boy_status_login
    )

    .get("/admin/get_order_invoice", [], AdminController.get_order_invoice)

    .get(
      "/admin/partner_today_order_invoice",
      [],
      AdminController.partner_today_order_invoice
    )

    .get(
      "/admin/partner_tomorrow_order_invoice",
      [],
      AdminController.partner_tomorrow_order_invoice
    )

    .get(
      "/admin/partner_today_order_by_product_invoice",
      [],
      AdminController.partner_today_order_by_product_invoice
    )

    .get(
      "/admin/partner_tomorrow_order_by_product_invoice",
      [],
      AdminController.partner_tomorrow_order_by_product_invoice
    )

    /// State Start ///

    .post(
      "/admin/state-list-all",
      [],
      authenticateToken,
      AdminController.state_list_all
    )

    .post(
      "/admin/update-state-status",
      [],
      authenticateToken,
      AdminController.update_state_status
    )

    /// State End ///

    .post("/admin/upload_doc1", AdminController.upload_doc1)
    .post("/admin/upload_doc2", AdminController.upload_doc2)
    .post("/admin/upload_doc3", AdminController.upload_doc3)
    .post(
      "/admin/update-profile-image-2",
      AdminController.update_profile_image2
    )

    .post(
      "/admin/schedule-order-status",
      [],
      authenticateToken,
      AdminController.schedule_order_status
    )

    .get(
      "/admin/schedule-order-status-cron",
      [],
      AdminController.schedule_order_status_cron
    )

    .post(
      "/admin/create-holiday",
      [],
      authenticateToken,
      AdminController.create_holiday
    )

    .post(
      "/admin/brand-holiday",
      [],
      authenticateToken,
      AdminController.brand_holiday
    )

    .post(
      "/admin/delete-holiday",
      [],
      authenticateToken,
      AdminController.delete_holiday
    )

    .post(
      "/admin/get_schedule",
      [],
      authenticateToken,
      AdminController.get_schedule
    )

    .post(
      "/admin/order-pdelete",
      [],
      authenticateToken,
      AdminController.order_pdelete
    )

    .post(
      "/admin/create-note",
      [],
      authenticateToken,
      AdminController.create_note
    )

    .post(
      "/admin/order-note",
      [],
      authenticateToken,
      AdminController.order_note
    )

    .post(
      "/admin/delete-order-note",
      [],
      authenticateToken,
      AdminController.delete_order_note
    )

    .post(
      "/admin/financial-log",
      [],
      authenticateToken,
      AdminController.financial_log
    )

    .post(
      "/admin/update-log-status",
      [],
      authenticateToken,
      AdminController.update_log_status
    )

    /// Manage Office Start //////

    .post(
      "/admin/create-office",
      [
        check("name")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter office name"),
        check("city")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Select city name"),
        check("address")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter address"),
        check("contact_person")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter contact person"),
        check("contact_person_email")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter contact person email"),
        check("contact_person_mobile")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter contact person mobile"),
      ],
      authenticateToken,
      AdminController.create_office
    )

    .post(
      "/admin/office-list",
      [],
      authenticateToken,
      AdminController.office_list
    )

    .post(
      "/admin/update-office-status",
      [],
      authenticateToken,
      AdminController.update_office_status
    )

    .post(
      "/admin/get-single-office",
      [],
      authenticateToken,
      AdminController.get_office
    )

    .post(
      "/admin/update-office",
      [
        check("id").trim().isLength({ min: 1 }).withMessage("Enter zipcode id"),
        check("name")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter office name"),
        check("city")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Select city name"),
        check("address")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter address"),
        check("contact_person")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter contact person"),
        check("contact_person_email")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter contact person email"),
        check("contact_person_mobile")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter contact person mobile"),
      ],
      authenticateToken,
      AdminController.update_office
    )

    .post(
      "/admin/delete-office",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter zipcode id")],
      authenticateToken,
      AdminController.delete_office
    )

    /// Magage Office Stop  //////

    /// Unit Start //////

    .post(
      "/admin/create-unit",
      [
        check("name")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter office name"),
      ],
      authenticateToken,
      AdminController.create_unit
    )

    .post("/admin/unit-list", [], authenticateToken, AdminController.unit_list)

    .post(
      "/admin/get-single-unit",
      [],
      authenticateToken,
      AdminController.get_unit
    )

    .post(
      "/admin/update-unit",
      [
        check("id").trim().isLength({ min: 1 }).withMessage("Enter unit id"),
        check("name").trim().isLength({ min: 1 }).withMessage("Enter unit"),
      ],
      authenticateToken,
      AdminController.update_unit
    )

    .post(
      "/admin/delete-unit",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter unit id")],
      authenticateToken,
      AdminController.delete_unit
    )

    /// Unit Stop  //////

    /// Manage Product Rate Start //////

    .post(
      "/admin/create-product-rate",
      [
        check("product")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter product name"),
        check("vendor")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Select vendor name"),
        check("unit").trim().isLength({ min: 1 }).withMessage("Enter unit"),
        check("price")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter price name"),
      ],
      authenticateToken,
      AdminController.create_product_rate
    )

    .post(
      "/admin/product-rate-list",
      [],
      authenticateToken,
      AdminController.product_rate_list
    )

    .post(
      "/admin/get-single-product-rate",
      [],
      authenticateToken,
      AdminController.get_product_rate
    )

    .post(
      "/admin/update-product-rate",
      [
        check("id").trim().isLength({ min: 1 }).withMessage("Enter zipcode id"),
        check("product")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter product name"),
        check("vendor")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Select vendor name"),
        check("unit").trim().isLength({ min: 1 }).withMessage("Enter unit"),
        check("price")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter price name"),
      ],
      authenticateToken,
      AdminController.update_product_rate
    )

    .post(
      "/admin/delete-product-rate",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter rate id")],
      authenticateToken,
      AdminController.delete_product_rate
    )

    .post(
      "/admin/product-unit-list",
      [],
      authenticateToken,
      AdminController.product_unit_list
    )

    .post(
      "/admin/product-by-vendor",
      [],
      authenticateToken,
      AdminController.product_by_vendor
    )

    /// Manage Product Rate Stop  //////

    /// Plan Start //////

    .post(
      "/admin/create-plan",
      [
        check("name")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter office name"),
        check("price").trim().isLength({ min: 1 }).withMessage("Enter price"),
        check("day").trim().isLength({ min: 1 }).withMessage("Enter day"),
      ],
      authenticateToken,
      AdminController.create_plan
    )

    .post("/admin/plan-list", [], authenticateToken, AdminController.plan_list)

    .post(
      "/admin/update-plan-status",
      [],
      authenticateToken,
      AdminController.update_plan_status
    )

    .post(
      "/admin/get-single-plan",
      [],
      authenticateToken,
      AdminController.get_plan
    )

    .post(
      "/admin/update-plan",
      [
        check("name")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter office name"),
        check("price").trim().isLength({ min: 1 }).withMessage("Enter price"),
        check("day").trim().isLength({ min: 1 }).withMessage("Enter day"),
      ],
      authenticateToken,
      AdminController.update_plan
    )

    .post(
      "/admin/delete-plan",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter zipcode id")],
      authenticateToken,
      AdminController.delete_plan
    )

    /// Plan Stop  //////

    .post(
      "/admin/check-stock",
      [],
      authenticateToken,
      AdminController.check_stock
    )

    .post(
      "/admin/check-office-stock",
      [],
      authenticateToken,
      AdminController.check_office_stock
    )

    /// Wallet Start ////

    .post(
      "/admin/add-wallet",
      [],
      authenticateToken,
      AdminController.add_wallet
    )

    .post(
      "/admin/wallet-list",
      [],
      authenticateToken,
      AdminController.wallet_list
    )

    .post(
      "/admin/delete-wallet",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter wallet id")],
      authenticateToken,
      AdminController.delete_wallet
    )

    /// Wallet End ////

    /// Stock Vendor Start ////

    .post(
      "/admin/add-vendor2",
      [
        //check('name').trim().isLength({ min: 1 }).withMessage('Enter category name id'),
      ],
      authenticateToken,
      AdminController.add_vendor2
    )

    .post(
      "/admin/vendor2-list",
      [],
      authenticateToken,
      AdminController.vendor2_list
    )

    .post(
      "/admin/update-vendor2-status",
      [],
      authenticateToken,
      AdminController.update_vendor2_status
    )

    .post(
      "/admin/update-vendor2",
      [],
      authenticateToken,
      AdminController.update_vendor2
    )

    .post(
      "/admin/get-single-vendor2",
      [],
      authenticateToken,
      AdminController.get_vendor2
    )

    .post(
      "/admin/delete-vendor2",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter vendor2 id")],
      authenticateToken,
      AdminController.delete_vendor2
    )

    /// Stock Vendor End ////

    /// Stock Category Start ////

    .post(
      "/admin/parent-stock-category-list",
      [],
      authenticateToken,
      AdminController.parent_stock_category_list
    )

    .post(
      "/admin/add-stock-category",
      [
        //check('name').trim().isLength({ min: 1 }).withMessage('Enter category name id'),
      ],
      authenticateToken,
      AdminController.add_stock_category
    )

    .post(
      "/admin/stock-category-list",
      [],
      authenticateToken,
      AdminController.stock_category_list
    )

    .post(
      "/admin/update-stock-category-status",
      [],
      authenticateToken,
      AdminController.update_stock_category_status
    )

    .post(
      "/admin/get-single-stock-category",
      [],
      authenticateToken,
      AdminController.get_stock_category
    )

    .post(
      "/admin/delete-stock-category",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter category id"),
      ],
      authenticateToken,
      AdminController.delete_stock_category
    )

    .post(
      "/admin/update-stock-category",
      [],
      authenticateToken,
      AdminController.update_stock_category
    )

    /// Stock Category End ////

    /// Stock Product Start ////

    .post(
      "/admin/sub-stock-category-list",
      [
        check("category_id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter parent category id"),
      ],
      authenticateToken,
      AdminController.sub_stock_category_list
    )

    .post(
      "/admin/add-stock-product",
      [],
      authenticateToken,
      AdminController.add_stock_product
    )

    .post(
      "/admin/stock-product-list",
      [],
      authenticateToken,
      AdminController.stock_product_list
    )

    .post(
      "/admin/update-stock-product-status",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter product id")],
      authenticateToken,
      AdminController.update_stock_product_status
    )

    .post(
      "/admin/get-single-stock-product",
      [],
      authenticateToken,
      AdminController.get_stock_product
    )

    .post(
      "/admin/delete-stock-product",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter product id")],
      authenticateToken,
      AdminController.delete_stock_product
    )

    .post(
      "/admin/update-stock-product",
      [],
      authenticateToken,
      AdminController.update_stock_product
    )

    .post(
      "/admin/all-stock-product-list",
      [],
      authenticateToken,
      AdminController.all_stock_product_list
    )

    /// Stock Product End ////

    .post(
      "/admin/all-stock-vendor-list",
      [],
      authenticateToken,
      AdminController.all_stock_vendor_list
    )

    .post(
      "/admin/add-inward",
      [],
      authenticateToken,
      AdminController.add_inward
    )

    .post(
      "/admin/inward-list",
      [],
      authenticateToken,
      AdminController.inward_list
    )

    .post(
      "/admin/all-stock-office-list",
      [],
      authenticateToken,
      AdminController.all_stock_office_list
    )

    .post(
      "/admin/delete-inward",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter id")],
      authenticateToken,
      AdminController.delete_inward
    )

    .post(
      "/admin/get-inward-data",
      [],
      authenticateToken,
      AdminController.get_inward_data
    )

    .post(
      "/admin/update-inward",
      [],
      authenticateToken,
      AdminController.update_inward
    )

    .post(
      "/admin/add-outward",
      [],
      authenticateToken,
      AdminController.add_outward
    )

    .post(
      "/admin/outward-list",
      [],
      authenticateToken,
      AdminController.outward_list
    )

    .post(
      "/admin/get-outward-data",
      [],
      authenticateToken,
      AdminController.get_outward_data
    )

    .post(
      "/admin/update-outward",
      [],
      authenticateToken,
      AdminController.update_outward
    )

    .post(
      "/admin/delete-outward",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter id")],
      authenticateToken,
      AdminController.delete_outward
    )

    .post(
      "/admin/stock-report",
      [],
      authenticateToken,
      AdminController.stock_report
    )

    .post(
      "/admin/sales_report_chart",
      [],
      authenticateToken,
      AdminController.sales_report_chart
    )

    /// Expense Start ////

    .post(
      "/admin/parent-expense-category-category-list",
      [],
      authenticateToken,
      AdminController.parent_expense_category_list
    )

    .post(
      "/admin/add-expense-category",
      [],
      authenticateToken,
      AdminController.add_expense_category
    )

    .post(
      "/admin/expense-category-list",
      [],
      authenticateToken,
      AdminController.expense_list
    )

    .post(
      "/admin/update-expense-category-status",
      [],
      authenticateToken,
      AdminController.update_expense_category_status
    )

    .post(
      "/admin/get-single-expense-category",
      [],
      authenticateToken,
      AdminController.get_expense_category
    )

    .post(
      "/admin/delete-expense-category",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter expense id")],
      authenticateToken,
      AdminController.delete_expense_category
    )

    .post(
      "/admin/update-expense-category",
      [],
      authenticateToken,
      AdminController.update_expense_category
    )

    /// Expense End ////

    /// Cargo Expense Start ////

    .post(
      "/admin/add-cargo-expense",
      [],
      authenticateToken,
      AdminController.add_cargo_expense
    )

    .post(
      "/admin/cargo-expense-list",
      [],
      authenticateToken,
      AdminController.cargo_expense_list
    )

    .post(
      "/admin/update-cargo-expense-status",
      [],
      authenticateToken,
      AdminController.update_cargo_expense_status
    )

    .post(
      "/admin/get-single-cargo-expense",
      [],
      authenticateToken,
      AdminController.get_cargo_expense
    )

    .post(
      "/admin/delete-cargo-expense",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter expense id")],
      authenticateToken,
      AdminController.delete_cargo_expense
    )

    .post(
      "/admin/update-cargo-expense",
      [],
      authenticateToken,
      AdminController.update_cargo_expense
    )

    .post(
      "/admin/delete-cargo-expense-file",
      [],
      authenticateToken,
      AdminController.delete_cargo_expense_file
    )

    /// Expense Cargo End ////

    /// Pickup Expense Start ////

    .post(
      "/admin/add-pickup-expense",
      [],
      authenticateToken,
      AdminController.add_pickup_expense
    )

    .post(
      "/admin/pickup-expense-list",
      [],
      authenticateToken,
      AdminController.pickup_expense_list
    )

    .post(
      "/admin/update-pickup-expense-status",
      [],
      authenticateToken,
      AdminController.update_pickup_expense_status
    )

    .post(
      "/admin/get-single-pickup-expense",
      [],
      authenticateToken,
      AdminController.get_pickup_expense
    )

    .post(
      "/admin/delete-pickup-expense",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter expense id")],
      authenticateToken,
      AdminController.delete_pickup_expense
    )

    .post(
      "/admin/update-pickup-expense",
      [],
      authenticateToken,
      AdminController.update_pickup_expense
    )

    .post(
      "/admin/delete-pickup-expense-file",
      [],
      authenticateToken,
      AdminController.delete_pickup_expense_file
    )

    /// Expense End ////

    /// Other Expense Start ////

    .post(
      "/admin/add-other-expense",
      [],
      authenticateToken,
      AdminController.add_other_expense
    )

    .post(
      "/admin/other-expense-list",
      [],
      authenticateToken,
      AdminController.other_expense_list
    )

    .post(
      "/admin/update-other-expense-status",
      [],
      authenticateToken,
      AdminController.update_other_expense_status
    )

    .post(
      "/admin/get-single-other-expense",
      [],
      authenticateToken,
      AdminController.get_other_expense
    )

    .post(
      "/admin/delete-other-expense",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter expense id")],
      authenticateToken,
      AdminController.delete_other_expense
    )

    .post(
      "/admin/update-other-expense",
      [],
      authenticateToken,
      AdminController.update_other_expense
    )

    .post(
      "/admin/delete-other-expense-file",
      [],
      authenticateToken,
      AdminController.delete_other_expense_file
    )

    /// Expense Other End ////

    .post(
      "/admin/all-expense-category",
      [],
      authenticateToken,
      AdminController.all_expense_category
    )

    .post(
      "/admin/all-expense-sub-category",
      [],
      authenticateToken,
      AdminController.all_expense_sub_category
    )

    /// Marketing Expense Start ////

    .post(
      "/admin/add-marketing-expense",
      [],
      authenticateToken,
      AdminController.add_marketing_expense
    )

    .post(
      "/admin/marketing-expense-list",
      [],
      authenticateToken,
      AdminController.marketing_expense_list
    )

    .post(
      "/admin/update-marketing-expense-status",
      [],
      authenticateToken,
      AdminController.update_marketing_expense_status
    )

    .post(
      "/admin/get-single-marketing-expense",
      [],
      authenticateToken,
      AdminController.get_marketing_expense
    )

    .post(
      "/admin/delete-marketing-expense",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter expense id")],
      authenticateToken,
      AdminController.delete_marketing_expense
    )

    .post(
      "/admin/update-marketing-expense",
      [],
      authenticateToken,
      AdminController.update_marketing_expense
    )

    .post(
      "/admin/delete-marketing-expense-file",
      [],
      authenticateToken,
      AdminController.delete_marketing_expense_file
    )

    /// Expense Marketing End ////

    /// Travel Expense Start ////

    .post(
      "/admin/add-travel-expense",
      [],
      authenticateToken,
      AdminController.add_travel_expense
    )

    .post(
      "/admin/travel-expense-list",
      [],
      authenticateToken,
      AdminController.travel_expense_list
    )

    .post(
      "/admin/update-travel-expense-status",
      [],
      authenticateToken,
      AdminController.update_travel_expense_status
    )

    .post(
      "/admin/get-single-travel-expense",
      [],
      authenticateToken,
      AdminController.get_travel_expense
    )

    .post(
      "/admin/delete-travel-expense",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter expense id")],
      authenticateToken,
      AdminController.delete_travel_expense
    )

    .post(
      "/admin/update-travel-expense",
      [],
      authenticateToken,
      AdminController.update_travel_expense
    )

    .post(
      "/admin/delete-travel-expense-file",
      [],
      authenticateToken,
      AdminController.delete_travel_expense_file
    )

    /// Travel Marketing End ////

    /// Requisition Expense Start ////

    .post(
      "/admin/add-requisition-expense",
      [],
      authenticateToken,
      AdminController.add_requisition_expense
    )

    .post(
      "/admin/requisition-expense-list",
      [],
      authenticateToken,
      AdminController.requisition_expense_list
    )

    .post(
      "/admin/update-requisition-expense-status",
      [],
      authenticateToken,
      AdminController.update_requisition_expense_status
    )

    .post(
      "/admin/get-single-requisition-expense",
      [],
      authenticateToken,
      AdminController.get_requisition_expense
    )

    .post(
      "/admin/delete-requisition-expense",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter expense id")],
      authenticateToken,
      AdminController.delete_requisition_expense
    )

    .post(
      "/admin/update-requisition-expense",
      [],
      authenticateToken,
      AdminController.update_requisition_expense
    )

    .post(
      "/admin/delete-requisition-expense-file",
      [],
      authenticateToken,
      AdminController.delete_requisition_expense_file
    )

    /// Expense Requisition End ////

    /// COD Expense Start ////

    .post(
      "/admin/add-cod-expense",
      [],
      authenticateToken,
      AdminController.add_cod_expense
    )

    .post(
      "/admin/cod-expense-list",
      [],
      authenticateToken,
      AdminController.cod_expense_list
    )

    .post(
      "/admin/update-cod-expense-status",
      [],
      authenticateToken,
      AdminController.update_cod_expense_status
    )

    .post(
      "/admin/get-single-cod-expense",
      [],
      authenticateToken,
      AdminController.get_cod_expense
    )

    .post(
      "/admin/delete-cod-expense",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter expense id")],
      authenticateToken,
      AdminController.delete_cod_expense
    )

    .post(
      "/admin/update-cod-expense",
      [],
      authenticateToken,
      AdminController.update_cod_expense
    )

    .post(
      "/admin/delete-cod-expense-file",
      [],
      authenticateToken,
      AdminController.delete_cod_expense_file
    )

    .post(
      "/admin/all-delivery-boy-list",
      [],
      authenticateToken,
      AdminController.all_delivery_boy_list
    )

    /// COD Requisition End ////

    /// Currency Start ////

    .post(
      "/admin/add-currency",
      [],
      authenticateToken,
      AdminController.add_currency
    )

    .post(
      "/admin/currency-list",
      [],
      authenticateToken,
      AdminController.currency_list
    )

    .post(
      "/admin/update-currency-status",
      [],
      authenticateToken,
      AdminController.update_currency_status
    )

    .post(
      "/admin/update-currency",
      [],
      authenticateToken,
      AdminController.update_currency
    )

    .post(
      "/admin/get-single-currency",
      [],
      authenticateToken,
      AdminController.get_currency
    )

    .post(
      "/admin/delete-currency",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter currency id"),
      ],
      authenticateToken,
      AdminController.delete_currency
    )
    .post(
      "/admin/default-currency",
      [],
      authenticateToken,
      AdminController.default_currency
    )
    /// Currency End ////

    /// Master category Start ////

    .post(
      "/admin/add-master-category",
      [],
      authenticateToken,
      AdminController.add_master_category
    )

    .post(
      "/admin/master-category-list",
      [],
      authenticateToken,
      AdminController.master_category_list
    )

    .post(
      "/admin/update-master-category-status",
      [],
      authenticateToken,
      AdminController.update_master_category_status
    )

    .post(
      "/admin/update-master-category",
      [],
      authenticateToken,
      AdminController.update_master_category
    )

    .post(
      "/admin/get-single-master-category",
      [],
      authenticateToken,
      AdminController.get_master_category
    )

    .post(
      "/admin/delete-master-category",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter master category id"),
      ],
      authenticateToken,
      AdminController.delete_master_category
    )
    .post(
      "/admin/parent-master-category-list",
      [],
      authenticateToken,
      AdminController.parent_master_category_list
    )

    .post(
      "/admin/add-section-image",
      [],
      authenticateToken,
      AdminController.add_section_image
    )
    .post(
      "/admin/update-section-image",
      [],
      authenticateToken,
      AdminController.update_section_image
    )
    .post(
      "/admin/section-image-list",
      [],
      authenticateToken,
      AdminController.section_image_list
    )
    .post(
      "/admin/delete-section-image",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter category id"),
      ],
      authenticateToken,
      AdminController.delete_section_image
    )
    .post(
      "/admin/all-parent-category-list",
      [],
      authenticateToken,
      AdminController.all_parent_category_list
    )
    /// Master category End ////

    /// Country Start ///

    .post(
      "/admin/create-country",
      [],
      authenticateToken,
      AdminController.create_country
    )

    .post(
      "/admin/country-list",
      [],
      authenticateToken,
      AdminController.country_list
    )
    .get("/admin/all-country-list", [], AdminController.all_country_list)

    .post(
      "/admin/update-country-status",
      [],
      authenticateToken,
      AdminController.update_country_status
    )

    .post(
      "/admin/get-single-country",
      [],
      authenticateToken,
      AdminController.get_country
    )

    .post(
      "/admin/update-country",
      [],
      authenticateToken,
      AdminController.update_country
    )

    .post(
      "/admin/delete-country",
      [check("id").trim().isLength({ min: 1 }).withMessage("Enter country id")],
      authenticateToken,
      AdminController.delete_country
    )

    .post(
      "/admin/update-child-stock",
      [],
      authenticateToken,
      AdminController.update_child_stock
    )
    .post(
      "/admin/update-parent-stock",
      [],
      authenticateToken,
      AdminController.update_parent_stock
    )

    /// Country End ///

    /// Deactivate Reason Start ////

    .post(
      "/admin/add-deactivate-reason",
      authenticateToken,
      AdminController.add_reason_reason
    )

    .post(
      "/admin/deactivate-reason-list",
      [],
      authenticateToken,
      AdminController.deactivate_reason_list
    )

    .post(
      "/admin/update-deactivate-reason-status",
      [],
      authenticateToken,
      AdminController.update_deactivate_reason_status
    )

    .post(
      "/admin/update-deactivate-reason",
      [],
      authenticateToken,
      AdminController.update_deactivate_reason
    )

    .post(
      "/admin/get-single-deactivate-reason",
      [],
      authenticateToken,
      AdminController.get_deactivate_reason
    )

    .post(
      "/admin/delete-deactivate-reason",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter product type id"),
      ],
      authenticateToken,
      AdminController.delete_deactivate_reason
    )

    /// Deactivate Reason End ////

    /// Return Reason Start ////

    .post(
      "/admin/add-return-reason",
      authenticateToken,
      AdminController.add_return_reason
    )

    .post(
      "/admin/return-reason-list",
      [],
      authenticateToken,
      AdminController.return_reason_list
    )

    .post(
      "/admin/update-return-reason-status",
      [],
      authenticateToken,
      AdminController.update_return_reason_status
    )

    .post(
      "/admin/update-return-reason",
      [],
      authenticateToken,
      AdminController.update_return_reason
    )

    .post(
      "/admin/get-single-return-reason",
      [],
      authenticateToken,
      AdminController.get_return_reason
    )

    .post(
      "/admin/delete-return-reason",
      [
        check("id")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Enter product type id"),
      ],
      authenticateToken,
      AdminController.delete_return_reason
    )
    .post(
      "/admin/update-customer-list",
      [],
      authenticateToken,
      AdminController.update_customer_list
    )

    .post(
      "/admin/bulk-upload",
      upload.single("upload"),
      [],
      authenticateToken,
      AdminController.bulk_upload
    );

  app.post(
    "/admin/add-landing-extra",
    authenticateToken,
    AdminController.add_landing_extra
  );
  app.post(
    "/admin/grid-image-list",
    [],
    authenticateToken,
    AdminController.grid_image_list
  );
  app.post(
    "/admin/update-landing-extra",
    authenticateToken,
    AdminController.update_landing_extra
  );
  app.post(
    "/admin/delete-grid",
    authenticateToken,
    AdminController.delete_grid
  );
  app.post(
    "/admin/update-landing-extra-sort",
    authenticateToken,
    AdminController.update_landing_extra_sort
  );
  /// Return Reason End ////

  app.get("/api/test", AdminController.test);

  //======================= NEW Features free shipping ================ //

  app.post("/admin/freeshipping", shippingController.addFreeshipping);
  app.get("/admin/freeshipping", shippingController.listFreeshipping);
  app.get("/admin/freeshipping/:id",shippingController.getFreeShippingById)
  app.put("/admin/freeshipping/:id",shippingController.updateFreeshipping)
  app.delete("/admin/freeshipping/:id",shippingController.deleteFreeshipping)
  app.post("/api/addshipping", shippingController.addShipping);
  app.get("/api/shipping", shippingController.listShipping);
  app.delete("/api/deleteShipping/:id", shippingController.deleteShipping);
  app.patch("/api/shipping", shippingController.updateShipping);
  app.get("/admin/zones", shippingController.Zones);
  app.post("/admin/zones", shippingController.addZone);
  app.get("/admin/zones/:id", shippingController.zoneDetail);
  app.put("/admin/zones/:id", shippingController.updateZone);
  app.delete("/admin/zones/:id", shippingController.deleteZone);
  app.get("/admin/country-for-zoned", shippingController.getCountriesZoned);
  app.get("/admin/country", shippingController.getCountries);
  app.post("/admin/country", shippingController.createZonedCountry);
  app.get("/admin/country/:id", shippingController.getDetailCountryZoned);
  app.put("/admin/country/:id", shippingController.updateCountryZoned);
  app.delete("/admin/country/:id", shippingController.deleteCountryZoned);
};
