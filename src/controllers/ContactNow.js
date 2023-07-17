const ContactNow = require("../models/ContactNowModel");

exports.create = (req, res) => {
    if (req.body.name && req.body.email) {
        var contactNowData = new ContactNow({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
            contact_number: req.body.contact_number,
        });

        contactNowData.save(function (err, response) {
            if (err) {
                res.status(200).send({
                    status: "error",
                    message: err,
                    token: req.token,
                });
            } else {
                res.status(200).send({
                    status: "success",
                    message: `We will contact you for ${req.body.subject}.`,
                });
            }
        });
    } else {
        res.status(200).send({
            status: "error",
            message: `Please enter name and email.`,
        });
    }
};

exports.view = (req, res) => {
    var where = {};
    if (req.body.name) {
        where["name"] = req.body.name;
    }
    if (req.body.email) {
        where["email"] = req.body.email;
    }
    if (req.body.contact_number) {
        where["contact_number"] = req.body.contact_number;
    }

    ContactNow.find(where)
        .sort("-createdAt")
        .exec((err, data) => {
            if (err) {
                res.status(200).send({
                    status: "error",
                    message: `something went wrong`,
                });
            }
            res.status(200).send({
                status: "success",
                data: data,
            });
        });
};

exports.deleteContactNow = (req, res) => {
    if (req.body.id || req.query.id) {
        ContactNow.findByIdAndDelete(
            {
                _id: req.body.id || req.query.id,
            },
            (err, docs) => {
                if (err) {
                    res.status(200).send({
                        status: "error",
                        message: "Something went wrong !! please try again later...",
                        error: err,
                    });
                } else {
                    res.status(200).send({
                        status: "success",
                        message: "Conatct Now deleted successfully",
                    });
                }
            }
        );
    } else {
        res.status(200).send({
            status: "error",
            message: "Please provide a valid _id",
        });
    }
};
