const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
var mongoose = require("mongoose");
const aws = require("aws-sdk");
const { v4: uuid } = require("uuid");
const moment = require("moment");
const multer = require("multer");
const multerS3 = require("multer-s3");
const axios = require("axios");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
moment().format();
const tmoment = require("moment-timezone");

// Set S3 endpoint
const s3 = new aws.S3({
  region: "us-east-1",
  accessKeyId: "AKIAYFSHH6MZEYZ7IEGA",
  secretAccessKey: "8GDb9gdBE/beAHzHEmy9B1zgFRT7il5SmhdoMSHY",
});

const JWT_SECRET = "krishna";

// Change bucket property to your Space name
var filename = Date.now().toString();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "swagbag-files",
    acl: "public-read",
    key: function (request, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, filename + "." + extension);
    },
  }),
}).array("upload", 1);

var Category = require("../models/CategoryModel");
var Brand = require("../models/BrandModel");
var Products = require("../models/ProductModel");
var Users = require("../models/UsersModel");
var City = require("../models/CityModel");
var Address = require("../models/AddressModel");
var Slider = require("../models/SliderModel");
var Cart = require("../models/CartModel");
var Wish = require("../models/WishModel");
var Coupon = require("../models/CouponModel");
var Checkout = require("../models/CheckoutModel");
var Settings = require("../models/SettingsModel");
var Review = require("../models/ReviewModel");
var Wallet = require("../models/WalletModel");
var Country = require("../models/CountryModel");
var MasterCategory = require("../models/MasterCategoryModel");
var Currency = require("../models/CurrencyModel");
var Blog = require("../models/BlogModel");

var DeactivateReason = require("../models/DeactivateReasonModel");
var ReturnReason = require("../models/ReturnReasonModel");
var MobileCategory = require("../models/MobileCategoryModel");

const SMTP_HOST = "smtp.sendgrid.net";
const SMTP_PORT = "587";
const SMTP_USERNAME = "apikey";
const SMTP_PASSWORD =
  "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";
const EMAIL_FROM = "support@swagbag.com";

const BASE_URL = "https://uae.swagbag.com/";

function email_html(html) {
  var myvar =
    "<!DOCTYPE html>" +
    "<html>" +
    "    <head>" +
    '        <meta charset="UTF-8" />' +
    '        <meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
    "    </head>" +
    "    <body>" +
    '        <table border="0" cellpadding="0" cellspacing="0" style="max-width: 1000px; margin: 0 auto; padding: 20px; background: #faf4ec">' +
    "            <tr>" +
    "                <td>" +
    '                    <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">' +
    "                        <tr>" +
    '                            <td style="text-align: center; padding-bottom: 20px">' +
    '                                <img src="https://uae.swagbag.com/img/email_logo.jpg" alt="" />' +
    "                            </td>" +
    "                        </tr>" +
    "                        <tr>" +
    '                            <td style="font-size: 22px; font-family: Arial, Helvetica, sans-serif; color: #000; padding-bottom: 15px; line-height: normal">' +
    html +
    "</td>" +
    "                        </tr>" +
    "                    </table>" +
    "                </td>" +
    "            </tr>" +
    "" +
    "            <tr>" +
    '                <td style="padding-top: 30px">' +
    '                    <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">' +
    "                        <tr>" +
    '                            <td style="padding: 30px; background: #edf3f3">' +
    '                                <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">' +
    "                                    <tr>" +
    '                                        <td style="font-size: 22px; text-align: center; font-family: Arial, Helvetica, sans-serif; color: #000; padding-bottom: 15px; line-height: 26px">Need Help?</td>' +
    "                                    </tr>" +
    "                                    <tr>" +
    '                                        <td style="font-size: 22px; text-align: center; font-family: Arial, Helvetica, sans-serif; color: #000; padding-bottom: 15px; line-height: 26px">For order related queries, contact customer care</td>' +
    "                                    </tr>" +
    "                                    <tr>" +
    '                                        <td style="font-size: 22px; text-align: center; font-family: Arial, Helvetica, sans-serif; color: #000; padding-bottom: 5px; line-height: 26px">Email - <a href="mailto:customercare@swagbag.com" title="" style="color: #000; text-decoration: none"> customercare@swagbag.com </a></td>' +
    "                                    </tr>" +
    "                                    <tr>" +
    '                                        <td style="font-size: 22px; text-align: center; font-family: Arial, Helvetica, sans-serif; color: #000; padding-bottom: 25px; line-height: 26px">Contact - <a href="tel:800 7924224" title="" style="color: #000; text-decoration: none"> 800 SWAGBAG (800 7924224) </a></td>' +
    "                                    </tr>" +
    "                                    <tr>" +
    '                                        <td style="font-size: 22px; text-align: center; font-family: Arial, Helvetica, sans-serif; color: #000; padding-bottom: 15px; line-height: 26px">Follow us on</td>' +
    "                                    </tr>" +
    "                                    <tr>" +
    '                                        <td style="font-size: 22px; text-align: center; font-family: Arial, Helvetica, sans-serif; color: #000; line-height: 26px">' +
    '                                            <a href="#" title="" style="margin: 0 7px"> <img src="https://uae.swagbag.com/img/emial_fb.jpg" alt="" /></a>' +
    '                                            <a href="#" title="" style="margin: 0 7px"> <img src="https://uae.swagbag.com/img/email_insta.jpg" alt="" /></a>' +
    "                                        </td>" +
    "                                    </tr>" +
    "                                </table>" +
    "                            </td>" +
    "                        </tr>" +
    "                    </table>" +
    "                </td>" +
    "            </tr>" +
    "        </table>" +
    "    </body>" +
    "</html>";
  return myvar;
}

async function email_otp(email) {
  var otp = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
  var where = {};
  where["email_otp"] = otp;
  Users.findOne(where).then((response) => {
    if (response == null) {
      var where = {};
      where["email"] = email;
      Users.findOneAndUpdate(
        where,
        {
          email_otp: otp,
        },
        {
          new: true,
        }
      )
        .exec()
        .then((response) => {
          let transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            //secure: process.env.SMTP_SECURE, // true for 465, false for other ports
            auth: {
              user: SMTP_USERNAME, // generated ethereal user
              pass: SMTP_PASSWORD, // generated ethereal password
            },
          });

          transporter
            .sendMail({
              from: EMAIL_FROM, // sender address
              to: email, // list of receivers
              subject: "Your OTP is: " + otp, // Subject line
              html: email_html("Hi,<br/> Your OTP is: " + otp + " <br/>.  "), // html body
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          email_otp(email);
        });
    } else {
      email_otp(email);
    }
  });
}

function gen_otp(mobile, res, successCallback, errorCallback) {
  var otp =
    mobile == "8010265036"
      ? 123456
      : Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
  var where = {};
  where["otp"] = otp;
  Users.findOne(where).then((response) => {
    if (response == null) {
      var where = {};
      where["mobile"] = mobile;
      where["deleted"] = 0;
      Users.findOneAndUpdate(
        where,
        {
          otp: otp,
        },
        {
          new: true,
        }
      )
        .exec()
        .then((response) => {
          axios
            .get(
              "https://2factor.in/API/V1/d4ab2eaa-d61e-11ea-9fa5-0200cd936042/SMS/" +
                mobile +
                "/" +
                otp +
                "/SMSOTP",
              {}
            )
            .then(function (response) {
              //console.log(response.data);
              successCallback(otp);
            })
            .catch(function (error) {
              res.status(200).send({
                status: "error",
                message: error.message,
              });
            });
        })
        .catch((error) => {
          gen_otp(mobile, res);
        });
    } else {
      gen_otp(mobile, res);
    }
  });
}

//"http://www.pertinaxsolution.com/api/mt/SendSMS?user=T2P&password=pert@%231234&senderid=TASTES&channel=Trans&DCS=0&flashsms=0&number=91" + mobile + "&text=" + encodeURI(msg) + "&route=4&APIKey=CILrx9K0d0Gf83sLV05qUw",

function gen_custom_sms(mobile, msg) {
  axios
    .get(
      "https://2factor.in/API/R1/?module=TRANS_SMS&apikey=d4ab2eaa-d61e-11ea-9fa5-0200cd936042&to=" +
        mobile +
        "&from=TASTES&msg=" +
        encodeURI(msg)
    )
    .then(function (response) {
      //console.log(response.data);
    });
}

function gen_order_otp(mobile, order_id, res, successCallback, errorCallback) {
  var otp = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
  var where = {};
  where["otp"] = otp;
  Checkout.findOne(where).then((response) => {
    if (response == null) {
      var where = {};
      where["_id"] = order_id;
      Checkout.findOneAndUpdate(
        where,
        {
          otp: otp,
        },
        {
          new: true,
        }
      )
        .exec()
        .then((response) => {
          axios
            .get(
              "https://2factor.in/API/V1/d4ab2eaa-d61e-11ea-9fa5-0200cd936042/SMS/" +
                mobile +
                "/" +
                otp +
                "/SMSOTP",
              {}
            )
            .then(function (response) {
              //console.log(response.data);
              successCallback(otp);
            })
            .catch(function (error) {
              res.status(200).send({
                status: "error",
                message: error.message,
              });
            });
        })
        .catch((error) => {
          gen_order_otp(mobile, res);
        });
    } else {
      gen_order_otp(mobile, res);
    }
  });
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = {
  all_category: async function (req, res) {
    var where = {};
    where["active"] = 1;
    where["deleted"] = 0;
    var master_category = await MasterCategory.find(where);
    var result = [];
    for (let i = 0; i < master_category.length; i++) {
      var category = [];
      var where = {};
      where["active"] = 1;
      where["deleted"] = 0;
      where["master"] = master_category[i]._id;
      where["parent"] = null;

      var allcategory = await Category.find(where);

      for (let j = 0; j < allcategory.length; j++) {
        var subcategory = [];
        var where = {};
        where["active"] = 1;
        where["deleted"] = 0;
        where["master"] = master_category[i]._id;
        where["parent"] = allcategory[j]._id;
        var allsubcategory = await Category.find(where);
        for (let k = 0; k < allsubcategory.length; k++) {
          subcategory.push({
            name: allsubcategory[k].name,
            id: allsubcategory[k]._id,
            file: master_category[k] ? master_category[k].file : "",
          });
        }

        category.push({
          name: allcategory[j].name,
          id: allcategory[j]._id,
          subcategory: allsubcategory,
          file: master_category[j] ? master_category[j].file : "",
        });
      }

      result.push({
        master: {
          name: master_category[i].name,
          id: master_category[i]._id,
          file: master_category[i] ? master_category[i].file : "",
        },
        category: category,
      });
    }

    res.status(200).send({
      status: "success",
      message: "",
      result: result,
    });
  },
  product_details: function (req, res) {
    var where = {};

    where["active"] = 1;
    where["slug"] = req.query.slug;
    where["deleted"] = 0;

    Products.findOne(where)
      .populate("master_category", "name slug")
      .populate("category", "name")
      .populate("sub_category", "name")
      .populate("cuisine", "name")
      .populate("brand", "name slug")
      .populate("vendor", "full_name")
      .populate("city", "name")
      .populate("product_types")
      .populate("master_category", "name slug")
      .sort({
        created_date: -1,
      })
      .then((response) => {
        var where = {};
        where["product"] = response._id;
        where["active"] = 1;
        where["deleted"] = 0;
        Review.find(where)
          .sort({
            created_date: -1,
          })
          .then((review_response) => {
            var where = {};

            where["active"] = 1;
            where["brand"] = response.brand._id;
            where["deleted"] = 0;
            where["_id"] = { $ne: response._id };

            Products.find(where, null, {
              limit: parseInt(5),
            })
              .populate("master_category", "name")
              .populate("category", "name")
              .populate("sub_category", "name")
              .populate("cuisine", "name")
              .populate("brand", "name slug")
              .populate("vendor", "full_name")
              .populate("city", "name")
              .sort({
                created_date: -1,
              })
              .then((related) => {
                ////////////////

                var where = {};
                where["name"] = {
                  $regex: ".*" + req.query.name,
                  $options: "i",
                };
                where["deleted"] = 0;
                where["active"] = 1;
                MasterCategory.findOne(where)
                  .sort({
                    name: 1,
                  })
                  .then((master_response) => {
                    if (master_response) {
                      Category.aggregate([
                        {
                          $lookup: {
                            from: "categories",
                            let: {},
                            pipeline: [{ $sort: { name: 1 } }],
                            localField: "_id",
                            foreignField: "parent",
                            as: "sub_category",
                          },
                        },
                        {
                          $match: {
                            master: master_response._id,
                            deleted: 0,
                          },
                        },
                        {
                          $lookup: {
                            from: "brands",
                            localField: "brands",
                            foreignField: "_id",
                            as: "all_brands",
                          },
                        },
                        { $sort: { name: 1 } },
                      ]).then((menu_response) => {
                        var imageitems = [];
                        var imagedata = response.file;
                        for (i = 0; i < imagedata.length; i++) {
                          imageitems.push({
                            src: imagedata[i].location,
                            w: 820,
                            h: 1240,
                            title: "",
                          });
                        }

                        var where = {};

                        where["active"] = 1;
                        where["category"] = { $in: response.category };
                        where["deleted"] = 0;
                        where["_id"] = { $ne: response._id };
                        where["sub_category"] = { $in: response.sub_category };

                        Products.find(where, null, {
                          limit: parseInt(5),
                        })
                          .populate("master_category", "name")
                          .populate("category", "name")
                          .populate("sub_category", "name")
                          .populate("cuisine", "name")
                          .populate("brand", "name slug")
                          .populate("vendor", "full_name")
                          .populate("city", "name")
                          .sort({
                            created_date: 1,
                          })
                          .then((category_related) => {
                            Settings.find()
                              .sort({
                                order: +1,
                              })
                              .then((settings) => {
                                res.status(200).send({
                                  status: "success",
                                  message: "",
                                  result: response,
                                  related: related,
                                  review: review_response
                                    ? review_response
                                    : {},
                                  menu: menu_response,
                                  imageitems: imageitems,
                                  category_related: category_related,
                                  settings: settings,
                                });
                              });
                          });
                      });
                    } else {
                      var where = {};

                      where["active"] = 1;
                      where["category"] = { $in: response.category };
                      where["deleted"] = 0;
                      where["_id"] = { $ne: response._id };
                      where["sub_category"] = { $in: response.sub_category };
                      Products.find(where, null, {
                        limit: parseInt(5),
                      })
                        .populate("master_category", "name")
                        .populate("category", "name")
                        .populate("sub_category", "name")
                        .populate("cuisine", "name")
                        .populate("brand", "name")
                        .populate("vendor", "full_name")
                        .populate("city", "name")
                        .sort({
                          created_date: 1,
                        })
                        .then((category_related) => {
                          Settings.find()
                            .sort({
                              order: +1,
                            })
                            .then((settings) => {
                              res.status(200).send({
                                status: "success",
                                message: "",
                                result: response,
                                related: related,
                                category_related: category_related,
                                review: review_response ? review_response : {},
                                menu: {},
                                settings: settings,
                              });
                            });
                        });
                    }
                  });
                ////////////////
              });
          })
          .catch((error) => {
            res.status(200).send({
              status: "error",
              message: error,
              result: [],
              review: [],
            });
          });
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: error,
          result: [],
          review: [],
        });
      });
  },
  product_search: function (req, res) {
    var where = {};

    if (req.query.master == "Travel accessories") {
      var master = "travel";
    } else {
      var master = req.query.master;
    }

    where["slug"] = master;

    MasterCategory.findOne(where).then((master_response) => {
      var where = {};
      where["active"] = 1;
      where["deleted"] = 0;

      if (master_response) {
        where["master_category"] = {
          $in: [mongoose.Types.ObjectId(master_response._id)],
        };
      }

      if (req.query.keyword && req.query.keyword != "") {
        where["$or"] = [
          {
            name: {
              $regex: ".*" + req.query.keyword + ".*",
              $options: "i",
            },
          },
          {
            tags: {
              $regex: ".*" + req.query.keyword + ".*",
              $options: "i",
            },
          },
          // {
          //     desc: {
          //         $regex: ".*" + req.query.keyword + ".*",
          //         $options: "i",
          //     },
          // },
        ];
      }

      if (req.query.deal && req.query.deal == "yes") {
        where["deal"] = 1;
        where["end_date"] = {
          $gte: new Date(Date.now()),
        };
      }

      if (req.query.brand && req.query.brand != "") {
        //
        var brands = [];
        for (let i = 0; i < req.query.brand.split(",").length; i++) {
          brands.push(mongoose.Types.ObjectId(req.query.brand.split(",")[i]));
        }

        where["brand"] = { $in: brands };
      }

      if (req.query.sub_category && req.query.sub_category != "") {
        var sub_category = [];
        for (let i = 0; i < req.query.sub_category.split(",").length; i++) {
          sub_category.push(
            mongoose.Types.ObjectId(req.query.sub_category.split(",")[i])
          );
        }

        where["sub_category"] = { $in: sub_category };
      }

      if (req.query.category && req.query.category != "") {
        var category = [];
        for (let i = 0; i < req.query.category.split(",").length; i++) {
          category.push(
            mongoose.Types.ObjectId(req.query.category.split(",")[i])
          );
        }
        where["category"] = { $in: category };
      }

      if (req.query.price && req.query.price != "") {
        where["price"] = {
          $gte: Number(req.query.price.split("|")[0]),
          $lte: Number(req.query.price.split("|")[1]),
        };
      }

      var q = [];
      if (req.query.option && req.query.option != "") {
        //where["options.value"] = { "$in" : ["sushi"]} } { $regex: ".*" + req.query.option, $options: "i" };
        //where["options.value"] = { $regex: ".*" + req.query.option, $options: "i" };
        //$and: [{ title: { $regex: "aa" } }, { title: { $regex: "t" } }, { title: { $not: /wel/ } }];
        var options = req.query.option.split(",");

        for (let i = 0; i < options.length; i++) {
          q.push({
            "options.value": {
              $regex: ".*" + options[i].trim() + "*.",
              $options: "i",
            },
          });
        }
        where["$or"] = q;
      }

      var sortby = {
        sale_count: -1,
      };
      if (req.query.sortby != "" && req.query.sortby == "latest") {
        var sortby = {
          created_date: -1,
        };
      }

      if (req.query.sortby != "" && req.query.sortby == "best_seller") {
        var sortby = {
          sale_count: -1,
        };
      }

      if (req.query.sortby != "" && req.query.sortby == "price-low") {
        var sortby = {
          price: 1,
          selling_price: 1,
        };
      }

      if (req.query.sortby != "" && req.query.sortby == "price-high") {
        var sortby = {
          price: -1,
          selling_price: -1,
        };
      }

      if (req.query.sortby != "" && req.query.sortby == "product-asc") {
        var sortby = {
          name: 1,
        };
      }

      if (req.query.sortby != "" && req.query.sortby == "product-desc") {
        var sortby = {
          name: -1,
        };
      }
      console.log(sortby);
      Products.find(where, null, {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.page),
      })
        .populate("category", "name")
        .populate("brand", "name slug")
        .sort(sortby)
        .then((response) => {
          Products.find(where).countDocuments(function (err, count) {
            res.status(200).send({
              status: "success",
              token: req.token,
              result: response,
              totalCount: count,
            });
          });
        })
        .catch((error) => {
          res.status(200).send({
            status: "error",
            message: error,
            result: [],
            review: [],
          });
        });
    });
  },
  filters: function (req, res) {
    var name = req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1);
    var where = {};
    where["name"] = name;
    where["deleted"] = 0;
    where["active"] = 1;

    MasterCategory.findOne(where).then((master_response) => {
      if (master_response) {
        if (req.query.category && req.query.category != "") {
          var match = {
            parent: null,
            deleted: 0,
            active: 1,
            master: master_response._id,
            _id: mongoose.Types.ObjectId(req.query.category),
          };
        } else {
          var match = {
            parent: null,
            deleted: 0,
            active: 1,
            master: master_response._id,
          };
        }

        Category.aggregate([
          {
            $lookup: {
              from: "categories",
              let: {},
              pipeline: [{ $sort: { name: 1 } }],
              localField: "_id",
              foreignField: "parent",
              as: "sub_category",
            },
          },

          {
            $match: match,
          },
          { $sort: { name: 1 } },
        ]).then((category_response) => {
          var where = {};

          where["active"] = 1;
          where["deleted"] = 0;

          if (req.query.brandslug && req.query.brandslug != "") {
            where["slug"] = req.query.brandslug;
          }
          Brand.find(where)
            .sort({ name: 1 })
            .then((brands) => {
              var where = {};
              var name =
                req.query.name.charAt(0).toUpperCase() +
                req.query.name.slice(1);
              where["name"] = name;
              where["deleted"] = 0;
              where["active"] = 1;
              MasterCategory.findOne(where)
                .sort({ name: 1 })
                .then((master_response) => {
                  if (master_response) {
                    Category.aggregate([
                      {
                        $lookup: {
                          from: "categories",
                          let: {},
                          pipeline: [{ $sort: { name: 1 } }],
                          localField: "_id",
                          foreignField: "parent",
                          as: "sub_category",
                        },
                      },

                      {
                        $match: {
                          master: master_response._id,
                          active: 1,
                          deleted: 0,
                        },
                      },

                      {
                        $lookup: {
                          from: "brands",
                          let: {},
                          pipeline: [{ $sort: { name: 1 } }],
                          localField: "brands",
                          foreignField: "_id",
                          as: "all_brands",
                        },
                      },
                      { $sort: { name: 1 } },
                    ]).then((menu_response) => {
                      res.status(200).send({
                        status: "success",
                        message: "",
                        result: [],
                        category: category_response.sort(),
                        brands: brands,
                        menu: menu_response,
                      });
                    });
                  } else {
                    res.status(200).send({
                      status: "success",
                      message: "",
                      result: [],
                      category: category_response.sort(),
                      brands: brands,
                      menu: {},
                    });
                  }
                });
            });
        });
      }
    });
  },

  extra_filter: function (req, res) {
    var name = req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1);
    var where = {};
    where["name"] = name;
    where["deleted"] = 0;
    where["active"] = 1;

    MasterCategory.findOne(where).then((master_response) => {
      var where = {};
      where["options"] = { $exists: true, $not: { $size: 0 } };
      where["deleted"] = 0;
      where["active"] = 1;

      if (master_response) {
        where["master_category"] = { $in: master_response._id };
      }

      if (req.query.category) {
        where["category"] = { $in: req.query.category };
      }

      if (req.query.sub_category) {
        where["sub_category"] = { $in: req.query.sub_category };
      }

      Products.find(where)

        .sort({
          name: 1,
        })
        .then((response) => {
          var options = [];
          for (let i = 0; i < response.length; i++) {
            if (response[i].options && response[i].options.length > 0) {
              var j;
              for (let j = 0; j < response[i].options.length; j++) {
                options.push({
                  name: response[i].options[j].name,
                  value: response[i].options[j].value,
                });
              }
            }
          }

          var keys = [];
          for (let k = 0; k < options.length; k++) {
            keys.push(options[k].name);
          }
          var uniqueKeys = [...new Set(keys)];

          var sanitised = [];
          for (let a = 0; a < uniqueKeys.length; a++) {
            var arr = [];
            for (let b = 0; b < options.length; b++) {
              if (options[b].name == uniqueKeys[a]) {
                arr.push(options[b].value);
              }
            }
            sanitised.push({
              name: uniqueKeys[a],
              value: arr,
            });
          }

          var finalarray = [];
          for (let cb = 0; cb < sanitised.length; cb++) {
            var arr2 = [];

            var arr3 = [];
            for (let d = 0; d < sanitised[cb].value.length; d++) {
              if (sanitised[cb].value[d]) {
                arr3.push(sanitised[cb].value[d].split(","));
              }
            }

            finalarray.push({
              name: sanitised[cb].name,
              value: Array.prototype.concat(...arr3),
            });
          }

          var newfinalarray = [];
          for (let s = 0; s < finalarray.length; s++) {
            var vals = [];
            for (let p = 0; p < finalarray[s].value.length; p++) {
              vals.push(finalarray[s].value[p].split(":")[0].trim());
            }

            var filteredArray = vals.filter(function (item, pos) {
              return vals.indexOf(item) == pos;
            });

            newfinalarray.push({
              name: finalarray[s].name,
              value: filteredArray,
            });
          }

          res.status(200).send({
            status: "success",
            token: req.token,
            result: newfinalarray.sort(),
          });
        });
    });
  },

  register: function (req, res) {
    var otp = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;

    var where = {};
    where["deleted"] = 0;
    where["email"] = req.body.email;
    where["user_type"] = "customer";

    Users.findOne(where)
      .then((response) => {
        if (response != null) {
          res.status(200).send({
            status: "error",
            message: "Email already in use.",
            result: [],
            OTP: "",
          });
        } else {
          bcryptjs.genSalt(saltRounds, (err, salt) => {
            bcryptjs.hash(req.body.password, salt, (err, hash) => {
              var userdata = new Users({
                password: hash,
                email: req.body.email,
                user_type: "customer",
                email_verified: 0,
                profile_image: "",
                first_time: req.body.ref_by != "" ? 1 : 0,
                reffer_by: req.body.ref_by,
                fname: req.body.fname,
                lname: req.body.lname,
                email_otp: otp,
                reffer_code: makeid(),
              });
              userdata.save(function (err, response) {
                if (err) {
                  res.status(200).send({
                    status: "error",
                    message: err,
                  });
                } else {
                  let transporter = nodemailer.createTransport({
                    host: SMTP_HOST,
                    port: SMTP_PORT,
                    //secure: process.env.SMTP_SECURE, // true for 465, false for other ports
                    auth: {
                      user: SMTP_USERNAME, // generated ethereal user
                      pass: SMTP_PASSWORD, // generated ethereal password
                    },
                  });

                  transporter
                    .sendMail({
                      from: EMAIL_FROM, // sender address
                      to: req.body.email, // list of receivers
                      subject: "Your OTP is: " + otp, // Subject line
                      html: email_html(
                        "Hi,<br/> Your OTP is: " + otp + " <br/>  "
                      ), // html body
                    })
                    .catch((error) => {
                      console.log(error);
                    });

                  var where = {};
                  Settings.find(where)
                    .sort({
                      order: +1,
                    })
                    .then((settings_response) => {
                      var signup_bonus_reciver = settings_response[10].value;

                      if (req.body.ref_by && req.body.ref_by != "") {
                        // console.log(otp,'email_otp')
                        var Walletdata = new Wallet({
                          user: response._id,
                          point: Number(signup_bonus_reciver),
                          type: 1,
                          note: "Referral signup bonus",
                        });
                        Walletdata.save(function (err, response) {});
                      }
                    });

                  // Net Suit Start

                  var data = JSON.stringify({
                    action: "CREATE",
                    fields: {
                      custId: response._id,
                      custName: req.body.fname + " " + req.body.lname,
                      phone: "",
                      email: req.body.email,
                    },
                  });

                  var config = {
                    method: "post",
                    url: "https://7454786.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=77&deploy=1&compid=7454786&h=33e9a831f3785ed3fb76",
                    headers: {
                      "User-Agent": "Mozilla/5.0",
                      token: "123",
                      "Content-Type": "application/json",
                      Cookie: "NS_ROUTING_VERSION=LAGGING",
                    },
                    data: data,
                  };

                  axios(config)
                    .then(function (response) {
                      console.log(JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                  // Net Suit End

                  // console.log(otp,'email_otp')
                  res.status(200).send({
                    status: "success",
                    message: "Registration was successfull",
                  });
                }
              });
            });
          });
        }
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: error.message,
        });
      });
  },
  login: function (req, res) {
    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
      res.status(200).send({
        status: "validation_error",
        errors: errors.array(),
      });
    } else {
      var where = {};
      where["email"] = req.body.email;
      where["deleted"] = 0;
      where["user_type"] = "customer";
      Users.findOne(where)
        .populate("role")
        .then((response) => {
          if (response.active == 0) {
            res.status(200).send({
              status: "verify",
              message: "Account is inactive",
            });
            return;
          }

          if (response.login_active == 0) {
            res.status(200).send({
              status: "error2",
              message: "Account is deactivated. Please contact admin.",
            });
            return;
          }

          // Load hash from the db, which was preivously stored
          bcryptjs.compare(
            req.body.password,
            response.password,
            function (err, result) {
              if (result == true) {
                const accessToken = jwt.sign(
                  {
                    email: req.body.email,
                  },
                  JWT_SECRET,
                  {
                    expiresIn: "180000s",
                  }
                );

                res.status(200).send({
                  status: "success",
                  message: "Logged in",
                  token: accessToken,
                  result: response,
                });
              } else {
                res.status(200).send({
                  status: "error",
                  message: "Invalid email/password",
                });
              }
            }
          );
        })
        .catch((error) => {
          res.status(200).send({
            status: "error",
            message: "Invalid email/password",
          });
        });
    }
  },

  verify_your_email: function (req, res) {
    // console.log(req.body)
    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
      res.status(200).send({
        status: "validation_error",
        errors: errors.array(),
      });
    } else {
      var where = {};
      where["email"] = req.body.email;
      where["active"] = 0;
      Users.findOne(where)
        .then((response) => {
          if (req.body.otp == response.email_otp) {
            Users.findOneAndUpdate(
              where,
              {
                active: 1,
                email_otp: 0,
              },
              {
                new: true,
              }
            )
              .exec()
              .then((response) => {
                res.status(200).send({
                  status: "success",
                  message: "Account has been Activated.",
                  //token: req.token,
                });
              })
              .catch((error) => {
                res.status(200).send({
                  status: "error",
                  message: "Account update error.",
                  //token: req.token,
                });
              });
          } else {
            res.status(200).send({
              status: "error",
              message: "Invalid OTP",
            });
          }
        })
        .catch((error) => {
          // console.log(error)
          res.status(200).send({
            status: "error",
            message: "Invalid email/OTP",
          });
        });
    }
  },

  send_email_otp_forget_password: function (req, res) {
    var otp = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;

    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
      res.status(200).send({
        status: "validation_error",
        errors: errors.array(),
      });
    } else {
      var where = {};
      where["email"] = req.body.email;

      Users.findOneAndUpdate(
        where,
        {
          email_otp: otp,
        },
        {
          new: true,
        }
      )
        .exec()
        .then((response) => {
          let transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            //secure: process.env.SMTP_SECURE, // true for 465, false for other ports
            auth: {
              user: SMTP_USERNAME, // generated ethereal user
              pass: SMTP_PASSWORD, // generated ethereal password
            },
          });

          transporter
            .sendMail({
              from: EMAIL_FROM, // sender address
              to: req.body.email, // list of receivers
              subject: "Your OTP is: " + otp, // Subject line
              html: email_html("Hi,<br/> Your OTP is: " + otp + " <br/>   "), // html body
            })
            .catch((error) => {
              console.log(error);
            });

          res.status(200).send({
            status: "success",
            message: "OTP has been send to your email address",
          });
        })
        .catch((error) => {
          res.status(200).send({
            status: "error",
            message: "Account update error.",
            //token: req.token,
          });
        });
    }
  },
  reset_your_password: function (req, res) {
    // console.log(req.body)
    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
      res.status(200).send({
        status: "validation_error",
        errors: errors.array(),
      });
    } else {
      var where = {};
      where["email"] = req.body.email;

      Users.findOne(where)
        .then((response) => {
          if (req.body.otp == response.email_otp) {
            bcryptjs.genSalt(saltRounds, (err, salt) => {
              bcryptjs.hash(req.body.password, salt, (err, hash) => {
                Users.findOneAndUpdate(
                  where,
                  {
                    password: hash,
                    email_otp: 0,
                  },
                  {
                    new: true,
                  }
                )
                  .exec()
                  .then((response) => {
                    res.status(200).send({
                      status: "success",
                      message: "The password has been reset successfully",
                      //token: req.token,
                    });
                  })
                  .catch((error) => {
                    res.status(200).send({
                      status: "error",
                      message: "Account update error.",
                      //token: req.token,
                    });
                  });
              });
            });
          } else {
            res.status(200).send({
              status: "error",
              message: "Invalid OTP",
            });
          }
        })
        .catch((error) => {
          // console.log(error)
          res.status(200).send({
            status: "error",
            message: "Invalid email/OTP",
          });
        });
    }
  },

  apply_coupon: function (req, res) {
    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
      res.status(200).send({
        status: "validation_error",
        errors: errors.array(),
      });
    } else {
      var totalCartPrice = 0;
      var where = {};
      where["user"] = req.body.id;
      Cart.find(where)

        .populate({
          path: "product",
          populate: [
            {
              path: "category",
              model: "categories",
              select: "name",
            },
            {
              path: "sub_category",
              model: "categories",
              select: "name",
            },

            {
              path: "brand",
              model: "brands",
              select: "name",
            },
          ],
        })
        .sort({
          created_date: -1,
        })
        .then((response) => {
          var coupon = req.body.coupon;
          var where = {};
          where["coupon"] = coupon;
          where["active"] = 1;
          where["deleted"] = 0;

          where["gift_card"] = { $ne: "Yes" };
          Coupon.findOne(where).then((response_coupon) => {
            for (var i = 0; i < response.length; i++) {
              totalCartPrice =
                Number(totalCartPrice) + Number(response[i].price);
              if (response[i].product != null) {
                if (response[i].product.deal == 1) {
                  res.status(200).send({
                    status: "error",
                    message: "Coupon is not applicable.",
                    result: [],
                  });
                  return;
                }

                if (
                  response_coupon &&
                  response_coupon.brand &&
                  response_coupon &&
                  response[i].product.brand &&
                  !response_coupon.brand.includes(response[i].product.brand._id)
                ) {
                  res.status(200).send({
                    status: "error",
                    message: "Coupon is not applicable",
                    result: [],
                  });
                  return;
                }

                if (
                  response_coupon &&
                  response_coupon.product &&
                  !response_coupon.product.includes(response[i].product._id)
                ) {
                  res.status(200).send({
                    status: "error",
                    message: "Coupon is not applicable.",
                    result: [],
                  });
                  return;
                }

                if (
                  response_coupon &&
                  response_coupon.category &&
                  !response_coupon.category.includes(
                    response[i].product.category
                  )
                ) {
                  res.status(200).send({
                    status: "error",
                    message: "Coupon is not applicable.",
                    result: [],
                  });
                  return;
                }
              }
            }

            var todayDate = moment().format();

            if (response_coupon != null) {
              var couponMinAmount = response_coupon.minimum_amount;
              var couponMaxAmount = response_coupon.maximum_amount;
              var couponExpiryDate = moment(response_coupon.exp_date)
                .endOf("day")
                .format();

              if (todayDate > couponExpiryDate) {
                res.status(200).send({
                  status: "error",

                  message: "Coupon expired",
                  result: [],
                });
              } else {
                if (Number(totalCartPrice) < Number(couponMinAmount)) {
                  res.status(200).send({
                    status: "error",

                    message:
                      "Cart amount should be more than " + couponMinAmount,
                    result: [],
                  });
                } else if (Number(totalCartPrice) > Number(couponMaxAmount)) {
                  res.status(200).send({
                    status: "error",
                    message:
                      "Cart amount should be less than " + couponMaxAmount,
                    result: [],
                  });
                } else {
                  res.status(200).send({
                    status: "success",
                    message: "coupon applied",
                    result: response_coupon,
                  });
                }
              }
            } else {
              res.status(200).send({
                status: "error",
                message: "Inavlid coupon.",
                result: [],
              });
            }
          });
        })
        .catch((error) => {
          res.status(200).send({
            status: "error",
            message: "something went wrong",
            result: [],
          });
        });
    }
  },

  address_list: function (req, res) {
    var where = {};

    where["user"] = req.query.id;
    where["deleted"] = 0;
    Address.find(where)
      .sort({
        created_date: -1,
      })
      //.populate("city", "name")
      //.populate("state", "name")
      .then((response) => {
        if (response) {
          res.status(200).send({
            status: "success",
            message: "",
            result: response,
          });
        } else {
          res.status(200).send({
            status: "error",
            message: "No data found",
            result: response,
          });
        }
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: error,
          result: [],
        });
      });
  },

  add_address: function (req, res) {
    var userAddressData = new Address({
      landmark: req.body.landmark,
      user: req.body.userid,
      title: req.body.title,
      address: req.body.address,
      address2: req.body.address2,
      country: req.body.country,
      city: req.body.city,
      state: req.body.state,
      post_office: req.body.post_office,
      pincode: req.body.pincode,
      contact_name: req.body.contact_name,
      contact_mobile: req.body.contact_mobile,
      country_code_number: req.body.country_code_number,
      position: {
        type: "Point",
        coordinates: [
          req.body.lat ? req.body.lat : 0,
          req.body.lng ? req.body.lng : 0,
        ],
      },
    });

    userAddressData
      .save()
      .then((response) => {
        res.status(200).send({
          status: "success",
          message: "Address added",
          response: response,
          //token: req.token,
        });
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: error,
          //token: req.token,
        });
      });
  },

  edit_address: function (req, res) {
    var where = {};
    where["_id"] = req.body.id;
    Address.findOneAndUpdate(
      where,
      {
        landmark: req.body.landmark,
        title: req.body.title,
        address: req.body.address,
        address2: req.body.address2,
        country: req.body.country,
        city: req.body.city,
        state: req.body.state,
        post_office: req.body.post_office,
        pincode: req.body.pincode,
        contact_name: req.body.contact_name,
        contact_mobile: req.body.contact_mobile,
        country_code_number: req.body.country_code_number,
        position: {
          type: "Point",
          coordinates: [
            req.body.lat ? req.body.lat : 0,
            req.body.lng ? req.body.lng : 0,
          ],
        },
      },
      {
        new: true,
      }
    )
      .exec()
      .then((response) => {
        res.status(200).send({
          status: "success",
          message: "Address has been updated.",
          //token: req.token,
        });
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: "Address update error.",
          //token: req.token,
        });
      });
  },
  delete_address: function (req, res) {
    var where = {};
    where["_id"] = req.query.id;
    Address.findOneAndUpdate(
      where,
      {
        deleted: 1,
      },
      {
        new: true,
      }
    )
      .exec()
      .then((response) => {
        res.status(200).send({
          status: "success",
          message: "Address has been deleted.",
          //token: req.token,
        });
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: "Address update error.",
          //token: req.token,
        });
      });
  },

  checkout: function (req, res) {
    var userId = req.body.userid;
    var where = {};
    where["_id"] = userId;
    Users.findOne(where).then((user_response) => {
      if (user_response && user_response.login_active == 0) {
        res.status(200).send({
          status: "error",
          message: "Your account is deactivated by admin",
          result: [],
        });
        return;
      }

      if (req.body.login == "Y") {
        var where = {};
        where["coupon"] = req.body.coupon;
        where["deleted"] = 0;
        where["active"] = 1;
        Coupon.findOne(where).then((coupon_response) => {
          var where = {};
          where["user"] = req.body.userid;
          Cart.find(where).then((cart_response) => {
            var cart_insert_data = [];
            var cart_data = cart_response;

            for (let i = 0; i < cart_data.length; i++) {
              var final_price = Number(cart_data[i].price);
              cart_data[i].option.map(
                (item2) => (final_price = final_price + Number(item2.price))
              );
              cart_insert_data.push({
                product: cart_data[i].product,
                quantity: cart_data[i].quantity,
                price: cart_data[i].price,
                productname: cart_data[i].name,
                option: cart_data[i].option,
                final: final_price,
              });
            }

            var timeStampInMs = Math.floor(Date.now() / 1000);
            var orderId = "SB-" + timeStampInMs;
            var checkoutData = new Checkout({
              gitwrap: req.body.gitwrap ? req.body.gitwrap.split(",") : null,
              orderid: orderId,
              transactionid: "",
              gateway: "COD",
              user: req.body.userid,
              address: req.body.address,
              billing: req.body.billing_address,
              products: cart_insert_data,
              coupon: req.body.coupon,
              coupontype: coupon_response ? coupon_response.type : "",
              couponamount: coupon_response ? coupon_response.amount : "",
              price: req.body.price,
              finalprice: req.body.finalprice,
              note: req.body.note,
              tax:
                req.body.total_tax && req.body.total_tax != ""
                  ? req.body.total_tax
                  : 0,
              shipping: req.body.shipping,
              packing: req.body.packing,
              balance: req.body.balance,
            });

            checkoutData
              .save()
              .then((response) => {
                res.status(200).send({
                  status: "success",
                  message: "checkout success",
                  orderId: orderId,
                });
              })
              .catch((error) => {
                res.status(200).send({
                  status: "error",
                  message: error,
                  orderId: "",
                  //token: req.token,
                });
              });
          });
        });
      } else {
        var where = {};
        where["email"] = req.body.email;
        Users.findOne(where).then((response) => {
          if (response) {
            var userid = response._id;
            var userAddress = new Address({
              user: userid,
              title: "Other",
              address: req.body.address1,
              address2: req.body.address2,
              city: req.body.city,
              state: req.body.state,
              pincode: req.body.zip,
              contact_name: req.body.fname + " " + req.body.lname,
              contact_mobile: req.body.phone,
              country_code_number: req.body.country_code,
            });
            userAddress.save(function (err, address_response) {
              var where = {};
              where["coupon"] = req.body.coupon;
              where["deleted"] = 0;
              where["active"] = 1;
              Coupon.findOne(where).then((coupon_response) => {
                var cart_insert_data = [];
                var cart_data = req.body.cart_data;

                for (let i = 0; i < cart_data.length; i++) {
                  var final_price = Number(cart_data[i].price);
                  cart_data[i].option.map(
                    (item2) => (final_price = final_price + Number(item2.price))
                  );
                  cart_insert_data.push({
                    product: cart_data[i].product._id,
                    quantity: cart_data[i].quantity,
                    price: cart_data[i].price,
                    productname: cart_data[i].name,
                    option: cart_data[i].option,
                    final: final_price,
                  });
                }

                // console.log(cart_insert_data);
                // res.status(200).send({
                //     status: "error",
                //     message: "A",
                //     orderId: "",
                //     //token: req.token,
                // });
                // return;

                var timeStampInMs = Math.floor(Date.now() / 1000);
                var orderId = "SB-" + timeStampInMs;
                var checkoutData = new Checkout({
                  gitwrap: req.body.gitwrap
                    ? req.body.gitwrap.split(",")
                    : null,
                  orderid: orderId,
                  transactionid: "",
                  gateway: "ONLINE",
                  user: response._id,
                  address: address_response._id,
                  billing: address_response._id,
                  products: cart_insert_data,
                  coupon: req.body.coupon,
                  coupontype: coupon_response ? coupon_response.type : "",
                  couponamount: coupon_response ? coupon_response.amount : "",
                  price: req.body.price,
                  finalprice: req.body.finalprice,
                  note: req.body.note,
                  tax:
                    req.body.total_tax && req.body.total_tax != ""
                      ? req.body.total_tax
                      : 0,
                });

                checkoutData.save().then((response) => {
                  if (req.body.billing.same == "false") {
                    var userAddress = new Address({
                      user: userid,
                      title: "Billing",
                      address: req.body.billing.address.address1,
                      address2: req.body.billing.address.address2,
                      city: req.body.billing.address.city,
                      state: req.body.billing.address.state,
                      pincode: req.body.billing.address.zip,
                      contact_name:
                        req.body.billing.address.fname +
                        " " +
                        req.body.billing.address.lname,
                      contact_mobile: req.body.billing.address.phone,
                      country_code_number: req.body.country_code,
                    });
                    userAddress.save(function (err, billing_address_response) {
                      var where = {};
                      where["_id"] = response._id;
                      Checkout.findOneAndUpdate(
                        where,
                        {
                          billing: billing_address_response._id,
                        },
                        {
                          new: true,
                        }
                      ).exec();
                    });
                  }

                  res.status(200).send({
                    status: "success",
                    message: "checkout success",
                    orderId: orderId,
                  });
                });
                // .catch((error) => {
                //     res.status(200).send({
                //         status: "error",
                //         message: error,
                //         orderId: "",
                //         //token: req.token,
                //     });
                // });
              });
            });
          } else {
            bcryptjs.genSalt(saltRounds, (err, salt) => {
              bcryptjs.hash(req.body.password, salt, (err, hash) => {
                var userdata = new Users({
                  password: hash,
                  email: req.body.email,
                  user_type: "customer",
                  active: 1,
                  email_verified: 0,
                  profile_image: "",
                  first_time: req.body.reffer_by != "" ? 1 : 0,
                  fname: req.body.fname,
                  lname: req.body.lname,
                  country_code_number: req.body.country_code,
                });
                userdata.save(function (err, user_response) {
                  var userAddress = new Address({
                    user: user_response._id,
                    title: "Other",
                    address: req.body.address,
                    address2: req.body.address2,
                    city: req.body.city,
                    state: req.body.state,
                    pincode: req.body.zip,
                    contact_name: req.body.fname + " " + req.body.lname,
                    contact_mobile: req.body.phone,
                    country_code_number: req.body.country_code,
                  });
                  userAddress.save(function (err, address_response) {
                    var where = {};
                    where["coupon"] = req.body.coupon;
                    where["deleted"] = 0;
                    where["active"] = 1;
                    Coupon.findOne(where).then((coupon_response) => {
                      var cart_insert_data = [];
                      var cart_data = JSON.parse(req.body.cart_data);
                      for (let i = 0; i < cart_data.length; i++) {
                        var final_price = Number(cart_data[i].price);
                        cart_data[i].option.map(
                          (item2) =>
                            (final_price = final_price + Number(item2.price))
                        );
                        cart_insert_data.push({
                          product: cart_data[i].productid,
                          quantity: cart_data[i].quantity,
                          price: cart_data[i].price,
                          productname: cart_data[i].name,
                          option: cart_data[i].option,
                          final: final_price,
                        });
                      }

                      var timeStampInMs = Math.floor(Date.now() / 1000);
                      var orderId = "SB-" + timeStampInMs;
                      var checkoutData = new Checkout({
                        gitwrap: req.body.gitwrap
                          ? req.body.gitwrap.split(",")
                          : null,
                        orderid: orderId,
                        transactionid: "",
                        gateway: "ONLINE",
                        user: user_response._id,
                        address: address_response._id,
                        billing: address_response._id,
                        products: cart_insert_data,
                        coupon: req.body.coupon,
                        coupontype: coupon_response ? coupon_response.type : "",
                        couponamount: coupon_response
                          ? coupon_response.amount
                          : "",
                        price: req.body.price,
                        finalprice: req.body.finalprice,
                        note: req.body.note,
                        tax:
                          req.body.total_tax && req.body.total_tax != ""
                            ? req.body.total_tax
                            : 0,
                      });

                      checkoutData
                        .save()
                        .then((response) => {
                          if (req.body.billing.same == "false") {
                            var userAddress = new Address({
                              user: user_response._id,
                              title: "Billing",
                              address: req.body.billing.address.address1,
                              address2: req.body.billing.address.address2,
                              city: req.body.billing.address.city,
                              state: req.body.billing.address.state,
                              pincode: req.body.billing.address.zip,
                              contact_name:
                                req.body.billing.address.fname +
                                " " +
                                req.body.billing.address.lname,
                              country_code_number: req.body.country_code,
                            });
                            userAddress.save(function (
                              err,
                              billing_address_response
                            ) {
                              var where = {};
                              where["_id"] = response._id;
                              Checkout.findOneAndUpdate(
                                where,
                                {
                                  billing: billing_address_response._id,
                                },
                                {
                                  new: true,
                                }
                              ).exec();
                            });
                          }

                          res.status(200).send({
                            status: "success",
                            message: "checkout success",
                            orderId: orderId,
                          });
                        })
                        .catch((error) => {
                          res.status(200).send({
                            status: "error",
                            message: error,
                            orderId: "",
                            //token: req.token,
                          });
                        });
                    });
                  });
                });
              });
            });
          }
        });
      }
    });
  },
  checkout_confirm: function (req, res) {
    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
      res.status(200).send({
        status: "validation_error",
        errors: errors.array(),
        token: req.token,
      });
    } else {
      var where = {};
      where["orderid"] = req.body.orderid;
      Checkout.findOneAndUpdate(
        where,
        {
          status: "processing",
          gateway: req.body.gateway,
          transactionid: req.body.transactionid,
        },
        {
          new: true,
        }
      )
        .exec()
        .then((response) => {
          // Net Suit Start

          var where = {};
          where["orderid"] = req.body.orderid;
          Checkout.findOne(where).then((checkout_response) => {
            var items = [];

            for (let i = 0; i < checkout_response.products.length; i++) {
              var color = "";
              var size = "";

              // Update Sale Count
              var where = {};
              where["_id"] = checkout_response.products[i].product;

              Products.findOne(where).then((product_response) => {
                if (checkout_response.products[i].option.length == 0) {
                  var newstock =
                    Number(product_response.stock_qty) -
                    Number(checkout_response.products[i].quantity);
                  var newoptions = product_response.options;
                } else {
                  var newstock = Number(product_response.stock_qty);

                  for (let i = 0; i < product_response.options.length; i++) {
                    for (
                      let j = 0;
                      j < checkout_response.products[i].option.length;
                      j++
                    ) {
                      if (
                        product_response.options[i].name ==
                        product_response.options[i].value.key
                      ) {
                        var index = 0;
                        for (
                          let k = 0;
                          k <
                          product_response.options[i].value.value.split(",")
                            .length;
                          k++
                        ) {
                          if (
                            product_response.options[i].value.value
                              .split(",")
                              [k].includes(
                                product_response.options[i].value.value
                              )
                          ) {
                            index = k;
                          }
                        }
                        var selected_option = product_response.options[i].value
                          .split(",")
                          [index].split(":");

                        console.log("selected_option", selected_option);

                        var new_option =
                          selected_option[0] +
                          ":" +
                          selected_option[1] +
                          ":" +
                          selected_option[2] +
                          ":" +
                          Number(
                            selected_option[3] -
                              Number(checkout_response.products[i].quantity)
                          );

                        var option = product_response.options[i];
                        var new_option2 = option.value.split(",");
                        new_option2.splice(
                          new_option2.indexOf(option.value.split(",")[index]),
                          1,
                          new_option
                        );
                        var final = new_option2.join();

                        var newoptions = product_response.options;
                        newoptions.splice(i, 1, {
                          name: option.name,
                          value: final,
                        });
                      }
                    }
                  }
                }

                var sale_count = product_response.sale_count
                  ? product_response.sale_count
                  : 0;
                Products.findOneAndUpdate(
                  where,
                  {
                    sale_count: Number(sale_count) + 1,
                    stock_qty: newstock,
                    options: newoptions,
                  },
                  {
                    new: true,
                  }
                )
                  .exec()
                  .then((response) => {});
              });

              if (
                checkout_response.products[i].option[0] &&
                checkout_response.products[i].option[0].value.includes("#")
              ) {
                color = checkout_response.products[i].option[0].value;
              } else {
                if (checkout_response.products[i].option[0]) {
                  size = checkout_response.products[i].option[0].value;
                }
              }

              if (
                checkout_response.products[i].option[1] &&
                checkout_response.products[i].option[1].value.includes("#")
              ) {
                color = checkout_response.products[i].option[1].value;
              } else {
                if (checkout_response.products[i].option[1]) {
                  size = checkout_response.products[i].option[1].value;
                }
              }

              items.push({
                line_num: i + 1,
                item: checkout_response.products[i].productname,
                options: {
                  color: color,
                  size: size,
                  option3: "",
                  option4: "",
                  option5: "",
                },
                type: "inventoryitem",
                rate: checkout_response.products[i].final,
                quantity: checkout_response.products[i].quantity,
                tax: false,
                discount: 0,
              });
            }

            var data = JSON.stringify({
              action: "CREATE",
              fields: {
                order_id: checkout_response.orderid,
                customer: checkout_response.user,
                date: moment(
                  moment(checkout_response.created_date, "DD-MM-YYYY")
                ).format("DD-MM-YYYY"),
                memo: "ffff",
                paymentmethod: "Credit",
                date: "1/1/2022",
                discount: 0,
                items: items,
              },
            });

            var config = {
              method: "post",
              url: "https://7454786.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=78&deploy=1&compid=7454786&h=ad0d5952c1b8264a8691",
              headers: {
                "User-Agent": "Mozilla/5.0",
                token: "123",
                "Content-Type": "application/json",
              },
              data: data,
            };

            axios(config)
              .then(function (response) {})
              .catch(function (error) {
                console.log(error);
              });

            //////////////////////
          });

          // Net Suit End

          if (Number(response.balance) > 0) {
            var where = {};
            where["orderid"] = req.body.orderid;
            Checkout.findOne(where).then((order_response) => {
              var Walletdata = new Wallet({
                user: order_response.user,
                point: Number(order_response.balance),
                type: 0,
                note: "For order#" + order_response.orderid,
              });
              Walletdata.save(function (err, response) {
                if (err) {
                  console.log(err);
                }
              });
            });
          }

          var where = {};
          Settings.find(where)
            .sort({
              order: +1,
            })
            .then((settings_response) => {
              var where = {};
              where["_id"] = response.user;
              Users.findOne(where).then((customer_response) => {
                if (customer_response.reffer_by) {
                  var where = {};
                  where["mobile"] = customer_response.reffer_by;
                  Users.findOne(where).then((ref_customer_response) => {
                    if (customer_response.first_time == 1) {
                      var signup_bonus_reciver = settings_response[11].value;
                      var Walletdata = new Wallet({
                        user: ref_customer_response._id,
                        point: Number(signup_bonus_reciver),
                        type: 1,
                        note: "Referral signup bonus",
                      });
                      Walletdata.save(function (err, response) {});

                      var where = {};
                      where["_id"] = response.user;
                      Users.findOneAndUpdate(
                        where,
                        {
                          first_time: 0,
                        },
                        {
                          new: true,
                        }
                      )
                        .exec()
                        .then((response) => {});
                    }
                  });
                }
              });
            });

          var where = {};
          where["user"] = response.user;

          Cart.deleteMany(where).then((response) => {});

          res.status(200).send({
            status: "success",
            message: "order confirmed",
            result: response,
          });
        })
        .catch((error) => {
          res.status(200).send({
            status: "error",
            message: error,
            result: [],
          });
        });
    }
  },

  country_list: function (req, res) {
    var where = {};
    where["deleted"] = 0;
    where["active"] = 1;
    Country.find(where)
      .sort({
        created_date: -1,
      })

      .then((response) => {
        if (response) {
          res.status(200).send({
            status: "success",
            message: "",
            result: response,
          });
        } else {
          res.status(200).send({
            status: "error",
            message: "No data found",
            result: response,
          });
        }
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: error,
          result: [],
        });
      });
  },

  fetch_usd: function (req, res) {
    var where = {};
    where["code"] = "USD";
    Currency.findOne(where)

      .then((response) => {
        if (response) {
          res.status(200).send({
            status: "success",
            message: "",
            result: response.value,
          });
        } else {
          res.status(200).send({
            status: "error",
            message: "No data found",
            result: response,
          });
        }
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: error,
          result: [],
        });
      });
  },

  header_menu: function (req, res) {
    var where = {};
    where["name"] = req.query.name;
    MasterCategory.findOne(where).then((master_response) => {
      Category.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "sub_category",
          },
        },
        {
          $match: {
            master: master_response._id,
          },
        },
        {
          $lookup: {
            from: "brands",
            localField: "brands",
            foreignField: "_id",
            as: "all_brands",
          },
        },
      ]).then((category_response) => {
        res.status(200).send({
          status: "success",
          category: category_response,
        });
      });
    });
  },

  currency: function (req, res) {
    var where = {};

    Currency.find(where)
      .sort({
        created_date: -1,
      })

      .then((response) => {
        if (response) {
          res.status(200).send({
            status: "success",
            message: "",
            result: response,
          });
        } else {
          res.status(200).send({
            status: "error",
            message: "No data found",
            result: response,
          });
        }
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: error,
          result: [],
        });
      });
  },

  header_search: function (req, res) {
    MasterCategory.aggregate([
      {
        $match: {
          deleted: 0,
          active: 1,
        },
      },

      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "master_category",
          as: "product",
        },
      },

      { $unwind: "$product" },

      {
        $match: {
          $or: [
            {
              "product.name": {
                $regex: ".*" + req.query.s + ".*",
                $options: "i",
              },
            },
            {
              "product.tags": {
                $regex: ".*" + req.query.s + ".*",
                $options: "i",
              },
            },
          ],

          $and: [
            {
              "product.deleted": 0,
            },
            {
              "product.active": 1,
            },
          ],
        },
      },
      { $sort: { name: -1 } },
      { $limit: 100 },
    ]).then((category_response) => {
      var arr = [];
      let uniqueObjArray = [
        ...new Map(
          category_response.map((item) => [item["name"], item])
        ).values(),
      ];

      for (let i = 0; i < uniqueObjArray.length; i++) {
        var product_arr = [];
        for (let j = 0; j < category_response.length; j++) {
          if (uniqueObjArray[i].name == category_response[j].name) {
            product_arr.push(category_response[j].product);
          }
        }

        arr.push({
          name: uniqueObjArray[i].name,
          id: uniqueObjArray[i].id,
          slug: uniqueObjArray[i].slug,
          product: product_arr,
        });
      }
      res.status(200).send({
        status: "success",
        result: arr,
      });
    });
  },

  settings: function (req, res) {
    var where = {};

    Settings.find(where)
      .sort({
        _id: 1,
      })
      .then((response) => {
        DeactivateReason.find(where).then((deactivate_response) => {
          ReturnReason.find(where).then((return_response) => {
            res.status(200).send({
              status: "success",
              result: response,
              return_reason: return_response,
              deactivate_reason: deactivate_response,
            });
          });
        });
      });
  },

  category_products: function (req, res) {
    var where = {};
    where["name"] = req.query.category;
    where["active"] = 1;
    MasterCategory.findOne(where).then((response) => {
      var where = {};
      where["active"] = 1;
      where["deleted"] = 0;
      where["master_category"] = response._id;
      where["featured"] = 1;
      Products.find(where)
        .populate("category", "name")
        .populate("sub_category", "name")
        .populate("cuisine", "name")
        .populate("brand", "name slug")
        .populate("vendor", "full_name")
        .populate("city", "name")
        .limit(5)
        .sort({
          _id: -1,
        })
        .then((product_response1) => {
          var where = {};
          where["active"] = 1;
          where["deleted"] = 0;
          where["master_category"] = response._id;
          Products.find(where)
            .populate("category", "name")
            .populate("sub_category", "name")
            .populate("cuisine", "name")
            .populate("brand", "name slug")
            .populate("vendor", "full_name")
            .populate("city", "name")
            .limit(5)
            .sort({
              _id: -1,
            })
            .then((product_response2) => {
              res.status(200).send({
                status: "success",
                message: "",
                recomended: product_response1,
                popular: product_response2,
              });
            })
            .catch((error) => {
              res.status(200).send({
                status: "error",
                message: error,
                result: {},
              });
            });
        })
        .catch((error) => {
          res.status(200).send({
            status: "error",
            message: error,
            result: [],
            review: [],
          });
        });
    });
  },
  add_to_wish: function (req, res) {
    var where = {};
    where["product"] = req.body.productid;
    Wish.find(where).countDocuments(function (err, count) {
      if (count == 0) {
        var where = {};
        where["_id"] = req.body.productid;
        Products.findOne(where).then((response) => {
          var wishData = new Wish({
            user: req.body.id,
            product: req.body.productid,
            name: response.name,
            slug: response.slug,
            image: response && response.file[0].location,
          });
          wishData.save().then(() => {});
        });
      }

      res.status(200).send({
        status: "success",
        message: "product has been added to wish list",
        qty: count,
      });
    });
  },
  add_to_cart: async function (req, res) {
    var quantity = req.body.quantity;

    ///
    var where = {};

    if (req.body.id && req.body.id != "") {
      where["user"] = req.body.id;
    }

    if (req.body.uniqueid && req.body.uniqueid != "") {
      where["uniqueid"] = req.body.uniqueid;
    }

    where["product"] = req.body.productid;
    where["option"] = JSON.parse(req.body.option);
    var cart = await Cart.findOne(where);

    var product = await Products.findOne({ _id: req.body.productid });
    var stock_qty = product.stock_qty;

    if (product.options.length > 0) {
      var stock_qty = 0;
      for (let i = 0; i < product.options.length; i++) {
        var option = JSON.parse(req.body.option);

        for (let j = 0; j < option.length; j++) {
          if (product.options[i].name == option[j].key) {
            var values = product.options[i].value.split(",");
            for (let k = 0; k < values.length; k++) {
              if (values[k].includes(option[j].value)) {
                var option_arr = values[k].split(":");

                if (option_arr[3] && Number(option_arr[3]) > 0) {
                  stock_qty = stock_qty + Number(option_arr[3]);
                }
              }
            }
          }
        }
      }
    }

    if (Number(stock_qty) == 0) {
      res.status(200).send({
        status: "error",
        message: "Out of stock",
        //token: req.token,
      });
      return;
    }
    if (cart) {
      quantity = Number(quantity) + Number(cart.quantity);

      if (quantity > Number(stock_qty)) {
        res.status(200).send({
          status: "error",
          message: "Out of stock",
          //token: req.token,
        });
        return;
      }

      var where = {};
      where["_id"] = req.body.productid;
      Products.findOne(where).then((response) => {
        if (response.selling_price) {
          var productPrice = response.price;
          try {
            if (
              response.selling_price.value &&
              response.selling_price.value != NaN
            ) {
              var productPrice = response.selling_price.value;
            }
          } catch (err) {}
        } else {
          var productPrice = response.price.value;
        }
        var totalPrice = Number(productPrice) * Number(quantity);
        var where = {};
        where["_id"] = cart._id;
        Cart.findOneAndUpdate(
          where,
          {
            quantity: quantity,
            price: productPrice,
          },
          {
            new: true,
          }
        )
          .exec()
          .then((response) => {
            res.status(200).send({
              status: "success",
              message: "Cart updated.",
              //token: req.token,
            });
          })
          .catch((error) => {
            res.status(200).send({
              status: "error",
              message: "Cart update error.",
              //token: req.token,
            });
          });
      });
    } else {
      if (Number(req.body.quantity) > Number(stock_qty)) {
        res.status(200).send({
          status: "error",
          message: "Out of stock",
          //token: req.token,
        });
        return;
      }

      var where = {};
      where["_id"] = req.body.productid;
      Products.findOne(where)
        .then((response) => {
          if (response.selling_price) {
            var productPrice = response.price;
            try {
              if (
                response.selling_price.value &&
                response.selling_price.value != NaN
              ) {
                var productPrice = response.selling_price.value;
              }
            } catch (err) {}
          } else {
            var productPrice = response.price.value;
          }

          var totalPrice = Number(productPrice) * Number(req.body.quantity);

          var cartData = new Cart({
            user: req.body.id && req.body.id != "" ? req.body.id : null,
            product: req.body.productid,
            name: response.name,
            quantity: req.body.quantity,
            price: productPrice,
            option: JSON.parse(req.body.option),
            image: response && response.file[0].location,
            uniqueid: req.body.uniqueid,
          });
          cartData
            .save()
            .then((response) => {
              var where = {};
              where["user"] = req.body.id;
              Cart.find(where).countDocuments(function (err, count) {
                res.status(200).send({
                  status: "success",
                  message: "cart added",
                  qty: count,
                });
              });
            })
            .catch((error) => {
              res.status(200).send({
                status: "error",
                message: error,
                qty: 0,
                //token: req.token,
              });
            });
        })
        .catch((error) => {
          res.status(200).send({
            status: "error",
            message: error,
          });
        });
    }
    ///
  },
  wish_list: function (req, res) {
    var where = {};
    where["user"] = req.body.id;
    Wish.find(where)

      .populate({
        path: "product",
      })
      .sort({
        created_date: -1,
      })
      .then((response) => {
        // console.log(response);
        // if (response.length == 0) {
        //     res.status(200).send({
        //         status: "error",
        //         result: [],
        //     });
        //     return;
        // }

        res.status(200).send({
          status: "success",

          result: response,
        });
      });
  },
  cart_list: function (req, res) {
    if (
      (!req.body.uniqueid && !req.body.id) ||
      (req.body.uniqueid == "" && req.body.id == "")
    ) {
      res.status(200).send({
        status: "success",
        result: [],
      });
      return;
    }

    var where = {};

    if (req.body.id && req.body.id != "") {
      where["user"] = req.body.id;
    }

    if (req.body.uniqueid && req.body.uniqueid != "") {
      where["uniqueid"] = req.body.uniqueid;
    }

    //  where["user"] = req.body.id;

    Cart.find(where)

      .populate({
        path: "product",
      })
      .populate({
        path: "category",
      })
      .sort({
        created_date: -1,
      })
      .then((response) => {
        // if (response.length == 0) {
        //     res.status(200).send({
        //         status: "error",
        //         result: [],
        //     });
        //     return;
        // }

        res.status(200).send({
          status: "success",
          result: response,
        });
      });
  },
  delete_cart: function (req, res) {
    var where = {};
    where["_id"] = req.body.id;
    Cart.findOneAndRemove(where)
      .then((response) => {
        res.status(200).send({
          status: "success",
          message: "Cart deleted successfully",
          //token: req.token,
          result: response,
        });
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: error,
          //token: req.token,
        });
      });
  },
  delete_wish: function (req, res) {
    var where = {};
    where["product"] = req.body.product;
    where["user"] = req.body.user;
    Wish.findOneAndRemove(where)
      .then((response) => {
        res.status(200).send({
          status: "success",
          message: "Product deleted successfully from wish list",
          //token: req.token,
          result: response,
        });
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: error,
          //token: req.token,
        });
      });
  },
  clear_cart: function (req, res) {
    var where = {};

    if (req.body.userid && req.body.userid != "") {
      where["user"] = req.body.userid;
    }

    if (req.body.uniqueid && req.body.uniqueid != "") {
      where["uniqueid"] = req.body.uniqueid;
    }

    Cart.deleteMany(where)
      .then((response) => {
        res.status(200).send({
          status: "success",
          message: "Cart cleared successfully",
          //token: req.token,
          result: response,
        });
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: error,
          //token: req.token,
        });
      });
  },
  clear_wishlist: function (req, res) {
    var where = {};
    where["user"] = req.body.userid;
    Wish.deleteMany(where)
      .then((response) => {
        res.status(200).send({
          status: "success",
          message: "Wish cleared successfully",
          //token: req.token,
          result: response,
        });
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: error,
          //token: req.token,
        });
      });
  },
  update_cart: async function (req, res) {
    var where = {};
    where["_id"] = req.body.cartid;
    var cart = await Cart.findOne(where);
    var product = await Products.findOne({ _id: cart.product });
    var stock_qty = product.stock_qty;
    if (product.options.length > 0) {
      var stock_qty = 0;
      for (let i = 0; i < product.options.length; i++) {
        var option = cart.option;
        for (let j = 0; j < option.length; j++) {
          if (product.options[i].name == option[j].key) {
            var values = product.options[i].value.split(",");
            for (let k = 0; k < values.length; k++) {
              if (values[k].includes(option[j].value)) {
                var option_arr = values[k].split(":");

                if (option_arr[3] && Number(option_arr[3]) > 0) {
                  stock_qty = stock_qty + Number(option_arr[3]);
                }
              }
            }
          }
        }
      }
    }

    if (Number(stock_qty) < Number(req.body.quantity)) {
      res.status(200).send({
        status: "error",
        message: "Out of stock",
        //token: req.token,
      });
      return;
    }

    Cart.findOneAndUpdate(
      where,
      {
        quantity: req.body.quantity,
      },
      {
        new: true,
      }
    )
      .exec()
      .then((response) => {
        res.status(200).send({
          status: "success",
          message: "Cart updated.",
          //token: req.token,
        });
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: "Cart update error.",
          //token: req.token,
        });
      });
  },

  add_review: function (req, res) {
    Checkout.find({
      user: req.body.user,
      products: {
        $elemMatch: { product: mongoose.Types.ObjectId(req.body.product) },
      },
    }).countDocuments(function (err, count) {
      console.log(count);
      if (count > 0) {
        var ReviewData = new Review({
          user: req.body.user ? req.body.user : null,
          product: req.body.product,
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          rating: req.body.rating,
          review: req.body.review,
        });
        ReviewData.save()
          .then((response) => {
            res.status(200).send({
              status: "success",
              message: "Review added",
              result: response,
            });
          })
          .catch((error) => {
            res.status(200).send({
              status: "error",
              message: error,
              result: [],
            });
          });
      } else {
        res.status(200).send({
          status: "error",
          message: "Only who bought this product may leave a review.",
          //token: req.token,
        });
      }
    });
  },

  get_pg_response: function (req, res) {
    var data = JSON.stringify({
      Registration: {
        Currency: "USD",
        TransactionHint: "CPT:Y;VCC:Y;",
        OrderID: req.body.orderid,
        OrderName: "Paybill",
        Channel: "Web",
        Amount: req.body.amount,
        Customer: "Demo Merchant",
        UserName: "Demo_fY9c",
        Password: "Comtrust@20182018",
        ReturnPath: BASE_URL + "payment-auth?order=" + req.body.orderid,
      },
    });

    var config = {
      method: "post",
      url: "https://demo-ipg.ctdev.comtrust.ae:2443",
      headers: {
        Accept: "text/xml-standard-api",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        var where = {};
        where["orderid"] = req.body.orderid;
        Checkout.findOneAndUpdate(
          where,
          { transactionid: response.data.Transaction.TransactionID },
          { new: true }
        )
          .exec()
          .then((response3) => {
            res.status(200).send({
              status: "success",
              result: response.data,
            });
          })
          .catch((error) => {});
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  get_pg_response2: function (req, res) {
    var data = JSON.stringify({
      Registration: {
        Currency: "USD",
        TransactionHint: "CPT:Y;VCC:Y;",
        OrderID: req.body.orderid,
        OrderName: "Paybill",
        Channel: "Web",
        Amount: req.body.amount,
        Customer: "Demo Merchant",
        UserName: "Demo_fY9c",
        Password: "Comtrust@20182018",
        ReturnPath: BASE_URL + "gift-card-auth?order=" + req.body.orderid,
      },
    });

    var config = {
      method: "post",
      url: "https://demo-ipg.ctdev.comtrust.ae:2443",
      headers: {
        Accept: "text/xml-standard-api",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        var where = {};
        where["orderid"] = req.body.orderid;
        Checkout.findOneAndUpdate(
          where,
          { transactionid: response.data.Transaction.TransactionID },
          { new: true }
        )
          .exec()
          .then((response3) => {
            res.status(200).send({
              status: "success",
              result: response.data,
            });
          })
          .catch((error) => {});
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  payment_finalize: function (req, res) {
    var where = {};
    where["orderid"] = req.body.order;
    Checkout.findOne(where).then((response) => {
      var data = JSON.stringify({
        Finalization: {
          TransactionID: response.transactionid,
          Customer: "Demo Merchant",
          UserName: "Demo_fY9c",
          Password: "Comtrust@20182018",
        },
      });

      var config = {
        method: "post",
        url: "https://demo-ipg.ctdev.comtrust.ae:2443",
        headers: {
          Accept: "text/xml-standard-api",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response2) {
          if (
            response2.data.Transaction.ResponseClassDescription == "Success"
          ) {
            var where = {};
            where["orderid"] = req.body.order;
            Checkout.findOneAndUpdate(
              where,
              { status: "paid", gateway: "ONLINE" },
              { new: true }
            )
              .exec()
              .then((response3) => {
                res.status(200).send({
                  status: "success",
                  orderId: req.body.order,
                  final_price: response.finalprice,
                });
              })
              .catch((error) => {});
          } else {
            res.status(200).send({
              status: "error",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  },

  payment_finalize2: function (req, res) {
    var where = {};
    where["orderid"] = req.body.order;
    Checkout.findOne(where).then((response) => {
      var data = JSON.stringify({
        Finalization: {
          TransactionID: response.transactionid,
          Customer: "Demo Merchant",
          UserName: "Demo_fY9c",
          Password: "Comtrust@20182018",
        },
      });

      var config = {
        method: "post",
        url: "https://demo-ipg.ctdev.comtrust.ae:2443",
        headers: {
          Accept: "text/xml-standard-api",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response2) {
          if (
            response2.data.Transaction.ResponseClassDescription == "Success"
          ) {
            var where = {};
            where["orderid"] = req.body.order;
            Checkout.findOne(where)
              .populate("user")
              .then((response) => {
                var timeStampInMs = Math.floor(Date.now() / 1000);
                var gift_code = "SB-GIFT-" + timeStampInMs;

                var where = {};
                where["orderid"] = req.body.order;
                Checkout.findOneAndUpdate(
                  where,
                  { status: "paid", gift_code: gift_code },
                  { new: true }
                )
                  .exec()
                  .then((response3) => {
                    let transporter = nodemailer.createTransport({
                      host: SMTP_HOST,
                      port: SMTP_PORT,
                      //secure: process.env.SMTP_SECURE, // true for 465, false for other ports
                      auth: {
                        user: SMTP_USERNAME, // generated ethereal user
                        pass: SMTP_PASSWORD, // generated ethereal password
                      },
                    });

                    transporter
                      .sendMail({
                        from: EMAIL_FROM, // sender address
                        to: response.gift_email, // list of receivers
                        subject: "Gift card from: " + response.gift_email, // Subject line
                        html: email_html(
                          "Hi,<br/> " +
                            response.gift_email +
                            " sent gift card with you. <br/> Code: " +
                            gift_code +
                            " <br/> Amount: " +
                            response.finalprice +
                            " <br/>   "
                        ), // html body
                      })
                      .then((response3) => {
                        // console.log(response3);
                      })
                      .catch((error) => {
                        console.log(error);
                      });

                    res.status(200).send({
                      status: "success",
                      orderId: req.body.order,
                      final_price: response.finalprice,
                    });
                  });
              })
              .catch((error) => {});
          } else {
            res.status(200).send({
              status: "error",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  },

  gift_card: function (req, res) {
    var where = {};
    where["gift_card"] = "Yes";
    Coupon.find(where)

      .populate({
        path: "product",
      })
      .sort({
        created_date: -1,
      })
      .then((response) => {
        if (response.length == 0) {
          res.status(200).send({
            status: "error",
            result: [],
          });
          return;
        }

        res.status(200).send({
          status: "success",

          result: response,
        });
      });
  },

  checkout_giftcard: function (req, res) {
    var userId = req.body.userid;
    var where = {};
    where["_id"] = userId;
    Users.findOne(where).then((user_response) => {
      if (user_response && user_response.login_active == 0) {
        res.status(200).send({
          status: "error",
          message: "Your account is deactivated by admin",
          result: [],
        });
        return;
      }

      var where = {};
      where["_id"] = req.body.gift_card;
      Coupon.findOne(where).then((coupon_response) => {
        var timeStampInMs = Math.floor(Date.now() / 1000);
        var orderId = "SB-" + timeStampInMs;
        var checkoutData = new Checkout({
          orderid: orderId,
          transactionid: "",
          gateway: "ONLINE",
          user: user_response._id,
          address: null,
          products: [],
          gift_card: req.body.gift_card,
          price: coupon_response.amount,
          finalprice: coupon_response.amount,

          gift_fname: req.body.fname,
          gift_lname: req.body.lname,
          gift_email: req.body.email,
          gift_phone: req.body.phone,
          gift_message: req.body.message,
          gift_code: "",
        });

        checkoutData
          .save()
          .then((response) => {
            res.status(200).send({
              status: "success",
              message: "checkout success",
              orderId: orderId,
              price: coupon_response.amount,
            });
          })
          .catch((error) => {
            res.status(200).send({
              status: "error",
              message: error,
              orderId: "",
              //token: req.token,
            });
          });
      });
    });
  },

  master_category: function (req, res) {
    var where = {};
    where["deleted"] = 0;
    MasterCategory.find(where)
      .sort({
        created_date: -1,
      })

      .then((response) => {
        if (response) {
          res.status(200).send({
            status: "success",
            message: "",
            result: response,
          });
        } else {
          res.status(200).send({
            status: "error",
            message: "No data found",
            result: response,
          });
        }
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: error,
          result: [],
        });
      });
  },

  all_brands: function (req, res) {
    var where = {};
    where["deleted"] = 0;
    Brand.find(where)
      .sort({
        created_date: -1,
      })

      .then((response) => {
        if (response) {
          res.status(200).send({
            status: "success",
            message: "",
            result: response,
          });
        } else {
          res.status(200).send({
            status: "error",
            message: "No data found",
            result: response,
          });
        }
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: error,
          result: [],
        });
      });
  },

  all_products: function (req, res) {
    var where = {};
    where["deleted"] = 0;
    Products.find(where)
      .populate("category", "name")
      .populate("sub_category", "name")

      .populate("brand", "name")

      .populate("city", "name")
      .sort({
        created_date: -1,
      })

      .then((response) => {
        if (response) {
          res.status(200).send({
            status: "success",
            message: "",
            result: response,
          });
        } else {
          res.status(200).send({
            status: "error",
            message: "No data found",
            result: response,
          });
        }
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: error,
          result: [],
        });
      });
  },

  wallet_list: function (req, res) {
    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
      res.status(200).send({
        status: "validation_error",
        errors: errors.array(),
        token: req.token,
      });
    } else {
      var where = {};
      where["user"] = req.query.id;
      Wallet.find(where, null, {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.page),
      })
        .sort({
          created_date: -1,
        })
        .then((response) => {
          Wallet.find(where).countDocuments(function (err, count) {
            var where = {};
            where["user"] = mongoose.Types.ObjectId(req.query.id);
            where["type"] = 1;

            Wallet.aggregate([
              {
                $match: where,
              },
              {
                $group: {
                  _id: "_id",
                  totalValue: {
                    $sum: "$point",
                  },
                },
              },
            ]).then((sum_in) => {
              var where = {};
              where["user"] = mongoose.Types.ObjectId(req.query.id);
              where["type"] = 0;
              Wallet.aggregate([
                {
                  $match: where,
                },
                {
                  $group: {
                    _id: "_id",
                    totalValue: {
                      $sum: "$point",
                    },
                  },
                },
              ]).then((sum_out) => {
                res.status(200).send({
                  status: "success",
                  token: req.token,
                  result: response,
                  totalCount: count,
                  balance:
                    Number(sum_in.length > 0 ? sum_in[0].totalValue : 0) -
                    Number(sum_out.length > 0 ? sum_out[0].totalValue : 0),
                });
              });
            });
          });
        })
        .catch((error) => {
          res.status(200).send({
            status: "error",
            message: error,
            token: req.token,
          });
        });
    }
  },

  applygcard: function (req, res) {
    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
      res.status(200).send({
        status: "validation_error",
        errors: errors.array(),
        token: req.token,
      });
    } else {
      var where = {};
      where["gift_code"] = req.body.gift_card;
      Checkout.findOne(where).then((checkout_response) => {
        if (checkout_response) {
          var where = {};
          where["_id"] = checkout_response.gift_card;
          Coupon.findOne(where).then((coupon_response) => {
            var amount = coupon_response.amount;
            // console.log(otp,'email_otp')
            var Walletdata = new Wallet({
              user: req.body.id,
              point: Number(amount),
              type: 1,
              note: "Redeem gift card of " + amount,
            });
            Walletdata.save(function (err, response) {
              var where = {};
              where["_id"] = checkout_response._id;
              Checkout.findOneAndUpdate(
                where,
                {
                  gift_code: null,
                },
                {
                  new: true,
                }
              )
                .exec()
                .then((response) => {})
                .catch((error) => {});

              res.status(200).send({
                status: "success",
                message: "Gift card redeem successfully",
              });
            });
          });
        } else {
          res.status(200).send({
            status: "error",
            message: "Gift card not found",
          });
        }
      });
    }
  },

  all_city: function (req, res) {
    var where = {};
    where["name"] = req.query.id;
    Country.findOne(where).then((country_response) => {
      var where = {};
      where["deleted"] = 0;
      if (country_response) {
        where["country"] = country_response._id;
      }
      City.find(where)
        .then((response) => {
          if (response) {
            res.status(200).send({
              status: "success",
              message: "",
              result: response,
            });
          } else {
            res.status(200).send({
              status: "error",
              message: "No data found",
              result: response,
            });
          }
        })
        .catch((error) => {
          res.status(200).send({
            status: "error",
            message: error,
            result: [],
          });
        });
    });
  },

  user_balance: function (req, res) {
    var where = {};
    where["user"] = mongoose.Types.ObjectId(req.query.id);
    where["type"] = 1;

    Wallet.aggregate([
      {
        $match: where,
      },
      {
        $group: {
          _id: "_id",
          totalValue: {
            $sum: "$point",
          },
        },
      },
    ]).then((sum_in) => {
      var where = {};
      where["user"] = mongoose.Types.ObjectId(req.query.id);
      where["type"] = 0;
      Wallet.aggregate([
        {
          $match: where,
        },
        {
          $group: {
            _id: "_id",
            totalValue: {
              $sum: "$point",
            },
          },
        },
      ]).then((sum_out) => {
        res.status(200).send({
          status: "success",
          token: req.token,

          balance:
            Number(sum_in.length > 0 ? sum_in[0].totalValue : 0) -
            Number(sum_out.length > 0 ? sum_out[0].totalValue : 0),
        });
      });
    });
  },

  check_shipping: function (req, res) {
    var where = {};
    where["name"] = req.query.city;
    City.findOne(where).then((city_response) => {
      var where = {};
      where["name"] = req.query.country;
      Country.findOne(where).then((country_response) => {
        if (city_response && country_response) {
          res.status(200).send({
            status: "success",
            result: {
              country: {
                price_cubic_cm: country_response.price_cubic_cm,
                price_per_kg: country_response.price_per_kg,
              },
              city: {
                additional_cost: city_response.additional_cost,
                default: city_response.isDefault,
              },
            },
          });
        } else {
          res.status(200).send({
            status: "success",
            result: {
              country: {
                price_cubic_cm: 0,
                price_per_kg: 0,
              },
              city: {
                additional_cost: 0,
              },
            },
          });
        }
      });
    });
  },

  return_order: function (req, res) {
    var where = {};
    where["_id"] = req.body.orderid;

    ///////////////////////////

    Checkout.findOne(where)
      .populate("products")
      .then((checkout_response) => {
        var items = [];
        for (let i = 0; i < checkout_response.products.length; i++) {
          var color = "";
          var size = "";

          if (
            checkout_response.products[i].option[0] &&
            checkout_response.products[i].option[0].value.includes("#")
          ) {
            color = checkout_response.products[i].option[0].value;
          } else {
            if (checkout_response.products[i].option[0]) {
              size = checkout_response.products[i].option[0].value;
            }
          }

          if (
            checkout_response.products[i].option[1] &&
            checkout_response.products[i].option[1].value.includes("#")
          ) {
            color = checkout_response.products[i].option[1].value;
          } else {
            if (checkout_response.products[i].option[1]) {
              size = checkout_response.products[i].option[1].value;
            }
          }

          items.push({
            line_num: i + 1,
            item: checkout_response.products[i].productname,
            options: {
              color: color,
              size: size,
              option3: "",
              option4: "",
              option5: "",
            },
            type: "inventoryitem",
            quantity: checkout_response.products[i].quantity,
          });
        }

        var data = JSON.stringify({
          action: "RETURN",
          fields: {
            order_id: checkout_response.orderid,
            customer: checkout_response.user,
            paymentmethod: checkout_response.gateway,
            date: checkout_response.created_date, //"1/1/2022",
            discount: 0,
            memo: "ffff",
            items: items,
          },
        });

        var config = {
          method: "post",
          url: "https://7454786.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=79&deploy=1&compid=7454786&h=ce07b5697d059fabbe54",
          headers: {
            "User-Agent": "Mozilla/5.0",
            token: "123",
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      });

    ///////////////////////////

    var updatedata = {};
    updatedata["return_products"] = req.body.products.split(",");
    updatedata["status"] = "return_in_process";
    updatedata["return_reason"] = req.body.reason;

    Checkout.findOneAndUpdate(where, updatedata, { new: true })
      .exec()
      .then((response) => {
        res.status(200).send({
          status: "success",
        });
      });
  },

  cancel_order: function (req, res) {
    var where = {};
    where["_id"] = req.body.orderid;

    var updatedata = {};
    updatedata["status"] = "cancel";

    Checkout.findOneAndUpdate(where, updatedata, { new: true })
      .exec()
      .then((response) => {
        res.status(200).send({
          status: "success",
        });
      });
  },

  deactivate_account: function (req, res) {
    var where = {};
    where["_id"] = req.body.user;
    Users.findOneAndUpdate(
      where,
      { login_active: 0, deactivation_reason: req.body.deactivation_reason },
      { new: true }
    )
      .exec()
      .then((response) => {
        res.status(200).send({
          status: "success",
        });
      });
  },

  blog_detail: function (req, res) {
    var where = {};
    where["slug"] = req.query.slug;
    Blog.findOne(where)
      .populate("blog_category", "name")
      .then((blog_response) => {
        res.status(200).send({
          status: "success",
          token: req.token,
          result: blog_response,
        });
      });
  },
  all_blogs: function (req, res) {
    var where = {};
    Blog.find(where)
      .populate("blog_category", "name")
      .sort({
        createdAt: -1,
      })
      .then((blog_response) => {
        res.status(200).send({
          status: "success",
          token: req.token,
          result: blog_response,
        });
      });
  },

  mobile_home: async function (req, res) {
    var where = {};
    where["active"] = 1;
    where["deleted"] = 0;
    var slider = await Slider.find(where);

    var where = {};
    where["active"] = 1;
    where["deleted"] = 0;
    var master = await MasterCategory.find(where).sort({
      _id: -1,
    });
    var banner = [];
    for (let i = 0; i < master.length; i++) {
      var p = await MobileCategory.find(
        { master_category: master[i]._id },
        null,
        {
          limit: 2,
        }
      )
        .populate("product")
        .populate("brand");
      banner.push({
        master: master[i],
        banner: p,
      });
    }

    var deals = await Products.aggregate([
      {
        $match: {
          deal: 1,
          active: 1,
          deleted: 0,
          end_date: {
            $gte: new Date(Date.now()),
          },
        },
      },
      { $sample: { size: 3 } },
    ]);

    var featured = await Products.aggregate([
      { $match: { featured: 1, active: 1, deleted: 0 } },
      { $sample: { size: 3 } },
    ]);

    res.status(200).send({
      status: "success",
      token: req.token,
      result: {
        slider: slider,
        master_category: master,
        section: banner,
        deals: deals,
        featured: featured,
      },
    });
  },

  mobile_category: async function (req, res) {
    var where = {};
    where["active"] = 1;
    where["deleted"] = 0;
    where["master_category"] = req.body.master_category;
    var section = await MobileCategory.find(where)
      .populate("product")
      .populate("master_category");

    var where = {};
    where["featured"] = 1;
    where["active"] = 1;
    where["deleted"] = 0;
    where["master_category"] = req.body.master_category;

    var recomended = await Products.find(where).limit(10).sort({
      _id: -1,
    });

    var where = {};
    where["deal"] = 1;
    where["active"] = 1;
    where["deleted"] = 0;
    where["master_category"] = req.body.master_category;
    var deals = await Products.find(where).limit(10).sort({
      _id: -1,
    });

    var where = {};
    where["active"] = 1;
    where["deleted"] = 0;
    where["master"] = req.body.master_category;
    where["parent"] = null;
    where["$and"] = [
      {
        file: { $ne: null },
      },
      {
        file: { $ne: "" },
      },
    ];
    var category = await Category.find(where);

    var where = {};
    where["active"] = 1;
    where["deleted"] = 0;
    where["file"] = { $ne: null };
    var brand = await Brand.find(where);

    res.status(200).send({
      status: "success",
      token: req.token,
      result: {
        section: section,
        category: category,
        deals: deals,
        featured: recomended,
        brand: brand,
      },
    });
  },

  sync_cart: async function (req, res) {
    Cart.updateMany(
      { uniqueid: req.body.uniqueid },
      { user: req.body.id },
      function (err, docs) {
        if (err) {
          console.log(err);
        }

        res.status(200).send({
          status: "success",
        });
      }
    );
  },
  all_city_list: function (req, res) {
    var where = {};
    where["deleted"] = 0;
    where["active"] = 1;
    City.find(where)
      .then((response) => {
        res.status(200).send({
          status: "success",
          message: "",
          result: response,
        });
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: error,
          result: [],
        });
      });
  },

  login_fb: async function (req, res) {
    if (req.body.token) {
      const { data } = await axios({
        url: "https://graph.facebook.com/me",
        method: "get",
        params: {
          fields: ["id", "email"].join(","),
          access_token: req.body.token,
        },
      });

      if (data) {
        var where = {};
        where["email"] = req.body.email;
        console.log(where);
        Users.findOne(where)
          .then((response) => {
            if (response.active == 0) {
              res.status(200).send({
                status: "error",
                message: "Account is inactive",
              });
              return;
            }

            if (response.login_active == 0) {
              res.status(200).send({
                status: "error",
                message: "Account is deactivated. Please contact admin.",
              });
              return;
            }
            res.status(200).send({
              status: "success",
              message: "Login was successfull",
              result: response,
            });
          })
          .catch((error) => {
            res.status(200).send({
              status: "error",
              message: "Account not found",
            });
          });
      } else {
        res.status(200).send({
          status: "error",
          message: "Social login is not valid",
        });
      }
    } else {
      res.status(200).send({
        status: "error",
        message: "Social login is not valid",
      });
    }
  },

  register_fb: async function (req, res) {
    if (req.body.token) {
      const { data } = await axios({
        url: "https://graph.facebook.com/me",
        method: "get",
        params: {
          fields: ["id", "email"].join(","),
          access_token: req.body.token,
        },
      });

      if (data) {
        var where = {};
        where["email"] = req.body.email;
        where["deleted"] = 0;
        Users.findOne(where)
          .then((response) => {
            if (response.active == 0) {
              res.status(200).send({
                status: "verify",
                message: "Account is inactive",
              });
              return;
            }

            if (response.login_active == 0) {
              res.status(200).send({
                status: "error2",
                message: "Account is deactivated. Please contact admin.",
              });
              return;
            }

            if (response.deleted == 1) {
              res.status(200).send({
                status: "error",
                message:
                  "Your account has been suspended, please contact admin to proceed further",
              });
              return;
            }

            if (response.active == 0) {
              res.status(200).send({
                status: "error",
                message: "Account is inactive",
              });
              return;
            }
            res.status(200).send({
              status: "success",
              message: "Login was successfull",
              result: response,
            });
          })
          .catch((error) => {
            var UserData = new Users({
              fname: req.body.fname,
              lname: req.body.lname,
              full_name: req.body.fname + " " + req.body.lname,
              email: req.body.email,
              sso: "facebook",
              user_type: "customer",
              active: 1,
            });
            UserData.save(function (err, response) {
              // Net Suit Start
              var data = JSON.stringify({
                action: "CREATE",
                fields: {
                  custId: response._id,
                  custName: req.body.fname + " " + req.body.lname,
                  phone: "",
                  email: req.body.email,
                },
              });

              var config = {
                method: "post",
                url: "https://7454786.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=77&deploy=1&compid=7454786&h=33e9a831f3785ed3fb76",
                headers: {
                  "User-Agent": "Mozilla/5.0",
                  token: "123",
                  "Content-Type": "application/json",
                  Cookie: "NS_ROUTING_VERSION=LAGGING",
                },
                data: data,
              };

              axios(config)
                .then(function (response) {
                  console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                  console.log(error);
                });
              // Net Suit End

              Users.findOne(where)
                .then((response) => {
                  res.status(200).send({
                    status: "success",
                    message: "Login was successfull",
                    result: response,
                  });
                })
                .catch((error) => {
                  res.status(200).send({
                    status: "error",
                    message: error.message,
                  });
                });
            });
          });
      } else {
        res.status(200).send({
          status: "error",
          message: "Social login is not valid",
        });
      }
    } else {
      res.status(200).send({
        status: "error",
        message: "Social login is not valid",
      });
    }
  },

  login_google: async function (req, res) {
    var GOOGLE_CLIENT_ID =
      "270690778965-fvfnfmf1kluddnj8ud62msprnn855euu.apps.googleusercontent.com";
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);

    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        requiredAudience: GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });

      const payload = ticket.getPayload();

      if (payload) {
        var where = {};
        where["email"] = req.body.email;

        Users.findOne(where)
          .then((response) => {
            if (response.deleted == 1) {
              res.status(200).send({
                status: "error",
                message:
                  "Your account has been suspended, please contact admin to proceed further",
              });
              return;
            }

            if (response.active == 0) {
              res.status(200).send({
                status: "error",
                message: "Account is inactive",
              });
              return;
            }
            res.status(200).send({
              status: "success",
              message: "Login was successfull",
              result: response,
            });
          })
          .catch((error) => {
            res.status(200).send({
              status: "error",
              message: "Account not found",
            });
          });
      } else {
        res.status(200).send({
          status: "error",
          message: "Social login is not valid",
        });
      }
    } catch (err) {
      res.status(200).send({
        status: "error",
        message: err.message,
      });
      return;
    }
  },

  register_google: async function (req, res) {
    var GOOGLE_CLIENT_ID =
      "270690778965-fvfnfmf1kluddnj8ud62msprnn855euu.apps.googleusercontent.com";
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);

    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        requiredAudience: GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });

      const payload = ticket.getPayload();

      if (payload) {
        var where = {};
        where["email"] = req.body.email;
        where["deleted"] = 0;
        Users.findOne(where)
          .then((response) => {
            if (response.active == 0) {
              res.status(200).send({
                status: "verify",
                message: "Account is inactive",
              });
              return;
            }

            if (response.login_active == 0) {
              res.status(200).send({
                status: "error2",
                message: "Account is deactivated. Please contact admin.",
              });
              return;
            }

            if (response.deleted == 1) {
              res.status(200).send({
                status: "error",
                message:
                  "Your account has been suspended, please contact admin to proceed further",
              });
              return;
            }

            if (response.active == 0) {
              res.status(200).send({
                status: "error",
                message: "Account is inactive",
              });
              return;
            }
            res.status(200).send({
              status: "success",
              message: "Login was successfull",
              result: response,
            });
          })
          .catch((error) => {
            var UserData = new Users({
              fname: req.body.fname,
              lname: req.body.lname,
              user_type: "customer",
              email: req.body.email,
              sso: "google",
              active: 1,
            });
            UserData.save(function (err, response) {
              // Net Suit Start

              var data = JSON.stringify({
                action: "CREATE",
                fields: {
                  custId: response._id,
                  custName: req.body.fname + " " + req.body.lname,
                  phone: "",
                  email: req.body.email,
                },
              });

              var config = {
                method: "post",
                url: "https://7454786.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=77&deploy=1&compid=7454786&h=33e9a831f3785ed3fb76",
                headers: {
                  "User-Agent": "Mozilla/5.0",
                  token: "123",
                  "Content-Type": "application/json",
                  Cookie: "NS_ROUTING_VERSION=LAGGING",
                },
                data: data,
              };

              axios(config)
                .then(function (response) {
                  console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                  console.log(error);
                });
              // Net Suit End

              Users.findOne(where)
                .then((response) => {
                  res.status(200).send({
                    status: "success",
                    message: "Login was successfull",
                    result: response,
                  });
                })
                .catch((error) => {
                  res.status(200).send({
                    status: "error",
                    message: error.message,
                  });
                });
            });
          });
      } else {
        res.status(200).send({
          status: "error",
          message: "Social login is not valid",
        });
      }
    } catch (err) {
      res.status(200).send({
        status: "error",
        message: err.message,
      });
      return;
    }
  },

  one_brands: function (req, res) {
    var where = {};
    where["active"] = 1;
    where["deleted"] = 0;

    if (req.query.brandslug && req.query.brandslug != "") {
      where["slug"] = req.query.brandslug;
    }
    Brand.findOne(where).then((brand_brands) => {
      var where = {};
      where["name"] = { $regex: ".*" + req.query.name, $options: "i" };
      where["deleted"] = 0;
      where["active"] = 1;
      MasterCategory.findOne(where).then((master_response) => {
        if (master_response) {
          Category.aggregate([
            {
              $lookup: {
                from: "categories",
                localField: "_id",
                foreignField: "parent",
                as: "sub_category",
              },
            },
            {
              $match: {
                master: master_response._id,
                deleted: 0,
              },
            },
            {
              $lookup: {
                from: "brands",
                localField: "brands",
                foreignField: "_id",
                as: "all_brands",
              },
            },
          ]).then((menu_response) => {
            var where = {};
            where["brand"] = brand_brands._id;
            where["active"] = 1;
            where["deleted"] = 0;
            Products.find(where)
              .limit(10)
              .populate("brand")
              .sort({
                _id: -1,
              })
              .then((brands_products) => {
                res.status(200).send({
                  status: "success",
                  message: "",
                  brands: brand_brands,
                  menu: menu_response,
                  brands_products: brands_products,
                });
              });
          });
        } else {
          var where = {};
          where["brand"] = brand_brands._id;
          where["active"] = 1;
          where["deleted"] = 0;
          Products.find(where)
            .limit(10)
            .sort({
              _id: -1,
            })
            .then((brands_products) => {
              res.status(200).send({
                status: "success",
                message: "",
                brands: brand_brands,
                menu: {},
                brands_products: brands_products,
              });
            });
        }
      });
    });
  },

  mobile_product_search: function (req, res) {
    var where = {};
    where["$or"] = [
      {
        name: {
          $regex: ".*" + req.query.q + ".*",
          $options: "i",
        },
      },
    ];
    Brand.findOne(where).then((response) => {
      var where = {};

      if (response) {
        where["brand"] = response._id;
      }

      if (!response) {
        where["name"] = {
          $regex: ".*" + req.query.q + ".*",
          $options: "i",
        };
      }

      Products.find(where)
        .limit(10)
        .populate("brand")

        .then((response) => {
          var where = {};
          where["deleted"] = 0;
          where["active"] = 1;
          MasterCategory.find(where).then((master_response) => {
            var arr = [];
            for (let i = 0; i < master_response.length; i++) {
              var product_arr = [];
              for (let j = 0; j < response.length; j++) {
                if (
                  response[j].master_category.includes(master_response[i]._id)
                ) {
                  product_arr.push(response[j]);
                }
              }

              arr.push({
                master_category: master_response[i],
                product: product_arr,
              });
            }

            res.status(200).send({
              status: "success",
              result: arr,
            });
          });
        });
    });
  },

  update_stock: function (req, res) {
    // Update Sale Count
    var where = {};
    where["_id"] = req.body.product;

    Products.findOne(where)
      .then((product_response) => {
        if (product_response.options.length == 0) {
          var newstock = Number(req.body.qty);
          var newoptions = product_response.options;
        } else {
          var newstock = Number(product_response.stock_qty);

          for (let i = 0; i < product_response.options.length; i++) {
            if (product_response.options[i].name == req.body.option) {
              var index = 0;
              for (
                let k = 0;
                k < product_response.options[i].value.split(",").length;
                k++
              ) {
                if (
                  product_response.options[i].value
                    .split(",")
                    [k].includes(req.body.value)
                ) {
                  index = k;
                }
              }
              var selected_option = product_response.options[i].value
                .split(",")
                [index].split(":");

              var new_option =
                selected_option[0] +
                ":" +
                selected_option[1] +
                ":" +
                selected_option[2] +
                ":" +
                Number(req.body.qty);

              var option = product_response.options[i];
              var new_option2 = option.value.split(",");
              new_option2.splice(
                new_option2.indexOf(option.value.split(",")[index]),
                1,
                new_option
              );
              var final = new_option2.join();

              var newoptions = product_response.options;
              newoptions.splice(i, 1, {
                name: option.name,
                value: final,
              });
            }
          }
        }

        Products.findOneAndUpdate(
          where,
          {
            stock_qty: newstock,
            options: newoptions,
          },
          {
            new: true,
          }
        )
          .exec()
          .then((response) => {
            res.status(200).send({
              status: "success",
              message: "Stock updated",
            });
          });

        res.status(200).send({
          status: "success",
          message: "Stock updated",
        });
      })
      .catch((error) => {
        res.status(200).send({
          status: "error",
          message: "Not found",
        });
      });
  },

  //====================== new routs=================//
  cart_summary: function (req, res) {
    if (
      req.body.uniqueid ||
      req.body.id ||
      (req.body.uniqueid == "" && req.body.id == "")
    ) {
      res.status(400).send({
        status: "error",
        message: "No user found",
      });
      return;
    }

    var where = {};

    if (req.body.id && req.body.id != "") {
      where["user"] = req.body.id;
    }

    if (req.body.uniqueid && req.body.uniqueid != "") {
      where["uniqueid"] = req.body.uniqueid;
    }

    //  where["user"] = req.body.id;
    let products = [];
    Cart.find(where)

      .populate({
        path: "product",
      })
      .populate({
        path: "category",
      })
      .sort({
        created_date: -1,
      })
      .then((response) => {
        products = response;

        res.status(200).send({
          status: "success",
          result: response,
        });
      });
    if (products.length === 0) {
      res.status(400).send({
        status: "error",
        message: "No products in cart",
      });
    }
  },
};
