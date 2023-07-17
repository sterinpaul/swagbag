const MasterCategory = require("../models/MasterCategoryModel");
const SectionImage = require("../models/SectionImageModel");
var Category = require("../models/CategoryModel");
var Settings = require("../models/SettingsModel");
var Brand = require("../models/BrandModel");
var Slider = require("../models/SliderModel");
var Landing = require("../models/LandingModel");
exports.masterList = (req, res) => {
    MasterCategory.find()
        .sort({
            _id: -1,
        })
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }

            var where = {};
            where["deleted"] = 0;
            where["active"] = 1;
            Slider.find(where)
                .sort({
                    _id: -1,
                })
                .then((slider_response) => {
                    var where = {};
                    Landing.find(where)
                        .sort({
                            sort: 1,
                        })
                        .then((landing_response) => {
                            res.status(200).send({
                                status: "success",
                                result: data,
                                slider: slider_response,
                                landing: landing_response,
                            });
                        });
                });
        });
};

exports.sectionImage = (req, res) => {
    SectionImage.find()
        .sort({
            _id: 1,
        })
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }

            var where = {};
            where["name"] = req.query.name;
            where["deleted"] = 0;

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
                        ]).then((category_response) => {
                            Settings.find()
                                .sort({
                                    _id: 1,
                                })
                                .then((settings_response) => {
                                    var where = {};
                                    where["active"] = 1;
                                    where["deleted"] = 0;
                                    where["file"] = { $ne: null };
                                    Brand.find(where).then((brand_response) => {
                                        res.status(200).send({
                                            status: "success",
                                            category: category_response.sort(),
                                            result: data,
                                            settings: settings_response,
                                            brands: brand_response,
                                        });
                                    });
                                });
                        });
                    } else {
                        res.status(200).send({
                            status: "success",
                            category: {},
                            result: data,
                            settings: {},
                        });
                    }
                });
        });
};
