const CheckoutModel = require("../models/CheckoutModel");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Users = require("../models/UsersModel");
const Products = require("../models/ProductModel");

exports.orderReport = (req, res) => {
    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
        res.status(200).send({
            status: "validation_error",
            errors: errors.array(),
            token: req.token,
        });
    } else {
        var where = {};
        // where["status"] = req.body.status === "" ? "delivered" : req.body.status;
        where["deleted"] = 0;
        if (req.body.status && req.query.status != "") {
            where["status"] = req.body.status;
        }

        if (req.body.ordercity && req.query.ordercity != "") {
            where["abc.city"] = req.body.ordercity;
        }

        if (req.body.countryFilter && req.query.countryFilter != "") {
            where["abc.country"] = req.body.countryFilter;
        }

        if (req.body.start_date && req.body.start_date != "" && req.body.end_date && req.body.end_date != "") {
            where["created_date"] = {
                $gte: new Date(req.body.start_date),
                $lt: new Date(req.body.end_date),
            };
        }

        CheckoutModel.aggregate([
            { $unwind: "$address" },
            {
                $lookup: {
                    from: "addresses",
                    localField: "address",
                    foreignField: "_id",
                    as: "abc",
                },
            },
            {
                $match: where,
            },
            {
                $group: {
                    _id: {
                        year: { $year: { date: "$created_date" } },
                        month: { $month: { date: "$created_date" } },
                    },
                    sum: { $sum: { $toDouble: "$finalprice" } },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]).then((inward_response) => {
            res.status(200).send({
                result: inward_response,
                status: "success",
                token: req.token,
            });
            //////////////
        });
    }
};

exports.orderCount = (req, res) => {
    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
        res.status(200).send({
            status: "validation_error",
            errors: errors.array(),
            token: req.token,
        });
    } else {
        var where = {};
        // where["status"] = req.body.status === "" ? "delivered" : req.body.status;
        where["deleted"] = 0;
        if (req.body.status && req.query.status != "") {
            where["status"] = req.body.status;
        }

        if (req.body.ordercity && req.query.ordercity != "") {
            where["abc.city"] = req.body.ordercity;
        }

        if (req.body.countryFilter && req.query.countryFilter != "") {
            where["abc.country"] = req.body.countryFilter;
        }

        if (req.body.start_date && req.body.start_date != "" && req.body.end_date && req.body.end_date != "") {
            where["created_date"] = {
                $gte: new Date(req.body.start_date),
                $lt: new Date(req.body.end_date),
            };
        }

        CheckoutModel.aggregate([
            { $unwind: "$address" },
            {
                $lookup: {
                    from: "addresses",
                    localField: "address",
                    foreignField: "_id",
                    as: "abc",
                },
            },
            {
                $match: where,
            },
            {
                $group: {
                    _id: {
                        year: { $year: { date: "$created_date" } },
                        month: { $month: { date: "$created_date" } },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]).then((inward_response) => {
            res.status(200).send({
                result: inward_response,
                status: "success",
                token: req.token,
            });
            //////////////
        });
    }
};

exports.highestOrder = (req, res) => {
    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
        res.status(200).send({
            status: "validation_error",
            errors: errors.array(),
            token: req.token,
        });
    } else {
        var where = {};
        // where["status"] = req.body.status === "" ? "delivered" : req.body.status;
        where["deleted"] = 0;
        if (req.body.status && req.query.status != "") {
            where["status"] = req.body.status;
        }

        if (req.body.ordercity && req.query.ordercity != "") {
            where["abc.city"] = req.body.ordercity;
        }

        if (req.body.countryFilter && req.query.countryFilter != "") {
            where["abc.country"] = req.body.countryFilter;
        }

        if (req.body.start_date && req.body.start_date != "" && req.body.end_date && req.body.end_date != "") {
            where["created_date"] = {
                $gte: new Date(req.body.start_date),
                $lt: new Date(req.body.end_date),
            };
        }

        CheckoutModel.aggregate([
            { $unwind: "$address" },
            {
                $lookup: {
                    from: "addresses",
                    localField: "address",
                    foreignField: "_id",
                    as: "abc",
                },
            },
            {
                $match: where,
            },
            {
                $group: {
                    _id: {
                        year: { $year: { date: "$created_date" } },
                        month: { $month: { date: "$created_date" } },
                    },
                    max: { $max: "$finalprice" },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]).then((inward_response) => {
            res.status(200).send({
                result: inward_response,
                status: "success",
                token: req.token,
            });
            //////////////
        });
    }
};

exports.lowestOrder = (req, res) => {
    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
        res.status(200).send({
            status: "validation_error",
            errors: errors.array(),
            token: req.token,
        });
    } else {
        var where = {};
        // where["status"] = req.body.status === "" ? "delivered" : req.body.status;
        where["deleted"] = 0;
        if (req.body.status && req.query.status != "") {
            where["status"] = req.body.status;
        }

        if (req.body.ordercity && req.query.ordercity != "") {
            where["abc.city"] = req.body.ordercity;
        }

        if (req.body.countryFilter && req.query.countryFilter != "") {
            where["abc.country"] = req.body.countryFilter;
        }

        if (req.body.start_date && req.body.start_date != "" && req.body.end_date && req.body.end_date != "") {
            where["created_date"] = {
                $gte: new Date(req.body.start_date),
                $lt: new Date(req.body.end_date),
            };
        }

        CheckoutModel.aggregate([
            { $unwind: "$address" },
            {
                $lookup: {
                    from: "addresses",
                    localField: "address",
                    foreignField: "_id",
                    as: "abc",
                },
            },
            {
                $match: where,
            },
            {
                $group: {
                    _id: {
                        year: { $year: { date: "$created_date" } },
                        month: { $month: { date: "$created_date" } },
                    },
                    min: { $min: "$finalprice" },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]).then((inward_response) => {
            res.status(200).send({
                result: inward_response,
                status: "success",
                token: req.token,
            });
            //////////////
        });
    }
};

exports.totalCustomersCount = async (req, res) => {
    const userCount = await Users.countDocuments((count) => count);
    if (!userCount) {
        return res.status(200).send({
            message: "unable to count Products",
            status: "error",
        });
    }
    res.status(200).send({
        result: userCount,
        status: "success",
    });
};

exports.totalProductsCount = async (req, res) => {
    const productCount = await Products.countDocuments((count) => count);
    if (!productCount) {
        return res.status(200).send({
            message: "unable to count Products",
            status: "error",
        });
    }
    res.status(200).send({
        result: productCount,
        status: "success",
    });
};

exports.totalSales = async (req, res) => {
    var where = {};
    // where["status"] = req.body.status === "" ? "delivered" : req.body.status;
    where["deleted"] = 0;

    const totalSales = await CheckoutModel.aggregate([
        {
            $match: where,
        },
        { $group: { _id: null, totalsales: { $sum: { $toDouble: "$finalprice" } } } },
    ]);

    if (!totalSales) {
        return res.status(400).json({
            error: "unable to count total sales",
        });
    }
    res.status(200).send({
        result: totalSales.pop().totalsales,
        status: "success",
    });
};

exports.totalOrdersPending = async (req, res) => {
    var where = {};
    where["status"] = "processing";
    where["deleted"] = 0;
    await CheckoutModel.aggregate([
        {
            $match: where,
        },
        {
            $group: {
                _id: null,
                count: { $sum: 1 },
            },
        },
    ]).then((inward_response) => {
        res.status(200).send({
            result: inward_response,
            status: "success",
        });
        //////////////
    });
};

exports.allReport = async (req, res) => {
    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
        res.status(200).send({
            status: "validation_error",
            errors: errors.array(),
            token: req.token,
        });
    } else {
        var where = {};
        // where["status"] = req.body.status === "" ? "delivered" : req.body.status;
        where["deleted"] = 0;
        if (req.body.status && req.query.status != "") {
            where["status"] = req.body.status;
        }

        if (req.body.ordercity && req.query.ordercity != "") {
            where["abc.city"] = req.body.ordercity;
        }

        if (req.body.countryFilter && req.query.countryFilter != "") {
            where["abc.country"] = req.body.countryFilter;
        }

        if (req.body.start_date && req.body.start_date != "" && req.body.end_date && req.body.end_date != "") {
            where["created_date"] = {
                $gte: new Date(req.body.start_date),
                $lt: new Date(req.body.end_date),
            };
        }

        var transactions = await CheckoutModel.aggregate([
            { $unwind: "$address" },
            {
                $lookup: {
                    from: "addresses",
                    localField: "address",
                    foreignField: "_id",
                    as: "abc",
                },
            },

            { $unwind: "$user" },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "xyz",
                },
            },

            {
                $match: where,
            },

            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]);
        res.status(200).send({
            transactions: transactions,
            status: "success",
            token: req.token,
        });
    }
};
