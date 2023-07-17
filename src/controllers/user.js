const CheckoutModel = require("../models/CheckoutModel");
const Users = require("../models/UsersModel");
const AddressModel = require("../models/AddressModel");
const mongoose = require("mongoose");

exports.userById = (req, res, next, id) => {
    Users.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: " User not found",
            });
        }
        req.profile = user;
        next();
    });
};

exports.singleUser = (req, res) => {
    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    Users.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true, useFindAndModify: false }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: "You are not Authorized",
            });
        }
        res.json(user);
    });
};

exports.showOrders = (req, res) => {
    if (req.query.id) {
        var where = {};
        if (req.query.filter_by && req.query.filter_by != "") {
            where["status"] = req.query.filter_by;
        }
        where["user"] = req.query.id;

        CheckoutModel.find(where)
            .populate("address")
            .populate("billing")
            .populate("products.product")
            .sort({
                created_date: -1,
            })
            .then((response) => {
                var respo = [];
                response.map((r) => {
                    if ((r.user = req.query.id)) {
                        respo.push(r);
                    }
                });
                res.json(respo);
            })
            .catch((error) => {
                console.log(error);
                res.status(200).send({
                    status: "error",
                    message: "Invalid user id",
                    token: req.token,
                });
            });
    }
};

// exports.showAdresses = (req, res) => {
//     if (req.query.id) {
//         var where = {};
//         if (req.query.status) {
//             where["status"] = req.query.status
//         }
//         where["user"] = req.query.id;
//         AddressModel.find(where)
//             .sort("-created_date")
//             .then((response) => {
//                 res.json(response);
//             })
//             .catch((error) => {
//                 console.log(error);
//                 res.status(200).send({
//                     status: "error",
//                     message: "Invalid user id",
//                     token: req.token,
//                 });
//             });
//     }
// };

// exports.addressById = (req, res, next, id) => {
//     AddressModel.findById(id).exec((err, address) => {
//         if (err || !address) {
//             return res.status(400).json({
//                 error: " Address not found",
//             });
//         }
//         req.address = address;
//         next();
//     });
// };

// // exports.updateAddress = (req, res) => {
// //     // console.log(req.address._id)
// //     AddressModel.findOneAndUpdate({ _id: req.address._id }, { $set: req.body }, { new: true, useFindAndModify: false }, (err, address) => {
// //         if (err) {
// //             return res.status(400).json({
// //                 error: "You are not Authorized",
// //             });
// //         }
// //         // user.hashed_password = undefined;
// //         // user.salt = undefined;
// //         res.json(address);
// //     });
// // };

// exports.removeAddress = (req, res) => {
//     let address = req.address;
//     // address.remove((err, deletedAddress) => {
//     //     if (err) {
//     //         return res.status(400).json({
//     //             error: err,
//     //         });
//     //     } 
//     //     res.json({
//     //         message: "Address deleted successfully",
//     //     });
//     // });
//     console.log(address._id,"Address")
// };

exports.updateAddressStatus = (req, res) => {
    var where1 = {};
    where1["user"] = mongoose.Types.ObjectId(req.query.user);
    AddressModel.find(where1)
        .then((response1) => {
            if (response1 != null || response1 != "") {
                for (var i = 0; i < response1.length; i++) {
                    if (response1[i].status == "default") {
                        var where2 = {};
                        where2["status"] = "default";
                        where2['_id'] = mongoose.Types.ObjectId(response1[i]._id);

                        AddressModel.findOneAndUpdate(
                            where2,
                            {
                                status: ""
                            },
                            {
                                new: true,
                            }
                        )
                            .exec()
                            .then()
                            .catch((error) => {
                                res.status(200).send({
                                    status: "error",
                                    message: "Address update error.",
                                    //token: req.token,
                                });
                            });

                        var where = {};
                        where["_id"] = mongoose.Types.ObjectId(req.query.id);
                        AddressModel.findOneAndUpdate(
                            where,
                            {
                                status: "default"
                            },
                            {
                                new: true,
                            }
                        )
                            .exec()
                            .then()
                            .catch((error) => {
                                res.status(200).send({
                                    status: "error",
                                    message: "Address update error.",
                                    //token: req.token,
                                });
                            });
                        res.status(200).send({
                            status: "success",
                            message: "Address updated.",
                            //token: req.token,
                        });
                    } else {

                        var where = {};
                        where["_id"] = mongoose.Types.ObjectId(req.query.id);
                        AddressModel.findOneAndUpdate(
                            where,
                            {
                                status: "default"
                            },
                            {
                                new: true,
                            }
                        )
                            .exec()
                            .then()
                            .catch((error) => {
                                res.status(200).send({
                                    status: "error",
                                    message: "Address update error.",
                                    //token: req.token,
                                });
                            });
                    }
                }
            }
        })


}