const BlogCategory = require("../models/BlogCategoryModel");
const Blog = require("../models/BlogModel");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const AdvertiseModel = require("../models/AdvertiseModel");
const ReviewNoteModel = require("../models/ReviewNoteModel");
const ReviewModel = require("../models/ReviewModel");

const spacesEndpoint = new aws.Endpoint("sgp1.digitaloceanspaces.com");
// const s3 = new aws.S3({
//     endpoint: spacesEndpoint,
//     accessKeyId: "EHJOOIDGTIYVUZ35IENX",
//     secretAccessKey: "pmijEYOpAU7vBCWcmSSSqW9Djs9mMVLPe8TYTTXgPi0",
// });

const s3 = new aws.S3({
    region: "us-east-1",
    accessKeyId: "AKIAYFSHH6MZEYZ7IEGA",
    secretAccessKey: "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",
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "swagbag-files",
        acl: "public-read",
        key: function (request, file, cb) {
            let extArray = file.mimetype.split("/");
            let extension = extArray[extArray.length - 1];
            cb(null, Date.now().toString() + Math.random().toString(36).substring(2, 7) + "." + extension);
        },
    }),
}).array("upload", 1);

exports.blogCategoryById = (req, res, next, id) => {
    BlogCategory.findById(id).exec((err, blogCategory) => {
        if (err || !blogCategory) {
            return res.status(400).json({
                error: "Blog Category not exist",
            });
        }
        req.blogCategory = blogCategory;
        next();
    });
};

exports.createBlogCategory = (req, res) => {
    const blogCategory = new BlogCategory(req.body);
    blogCategory.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        res.json({ data });
    });
};

exports.updateBlogCategory = (req, res) => {
    const blogCategory = req.blogCategory;
    blogCategory.name = req.body.name;
    blogCategory.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        res.json(data);
    });
};

exports.viewBlogCategory = (req, res) => {
    BlogCategory.find()
        .sort("createdAt")
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }
            res.json(data);
        });
};

exports.deleteBlogCategory = (req, res) => {
    const blogCategory = req.blogCategory;
    Blog.countDocuments({ blog_category: `${blogCategory._id}` }, function (err, count) {
        if (err) {
            return res.status(400).json({ error: err });
        } else {
            if (count > 0) {
                return res.status(400).json({
                    error: "Category is used",
                });
            } else {
                blogCategory.remove((err, data) => {
                    if (err) {
                        return res.status(400).json({
                            error: err,
                        });
                    }
                    res.json({ message: "Blog Category deleted Successfully" });
                });
            }
        }
    });
};

exports.blogById = (req, res, next, id) => {
    Blog.findById(id).exec((err, blog) => {
        if (err || !blog) {
            return res.status(400).json({
                error: "Blog not exist",
            });
        }
        req.blog = blog;
        next();
    });
};

exports.createBlog = (req, res) => {
    // console.log(req.query)
    if (!req.query.title || req.query.title == "") {
        res.status(200).send({
            status: "error",
            message: "Enter title name",
            token: req.token,
        });
    } else {
        upload(req, res, function (error) {
            if (error) {
                // res.status(200).send({
                //     status: "error",
                //     message: error.code,
                //     token: req.token,
                // });

                var blogData = new Blog({
                    title: req.query.title,
                    description: req.body.html,
                    blog_category: req.query.blog_category,
                });
                blogData.save(function (err, response) {
                    if (err) {
                        res.status(200).send({
                            status: "error",
                            message: err,
                            token: req.token,
                        });
                    } else {
                        res.status(200).send({
                            status: "success",
                            message: `${req.query.title} blogs has been created successfully.`,
                        });
                    }
                });
            } else {
                if (req.files.length > 0) {
                    var blogData = new Blog({
                        title: req.query.title,
                        description: req.body.html,
                        blog_category: req.query.blog_category,
                        image: req.files[0].location,
                    });
                    blogData.save(function (err, response) {
                        if (err) {
                            res.status(200).send({
                                status: "error",
                                message: err,
                                token: req.token,
                            });
                        } else {
                            res.status(200).send({
                                status: "success",
                                message: "Blog has been created successfully.",
                            });
                        }
                    });
                } else {
                    var blogData = new Blog({
                        title: req.query.title,
                        description: req.body.html,
                        blog_category: req.query.blog_category,
                    });

                    blogData.save(function (err, response) {
                        if (err) {
                            res.status(200).send({
                                status: "error",
                                message: err,
                                token: req.token,
                            });
                        } else {
                            res.status(200).send({
                                status: "success",
                                message: "Blog has been created successfully.",
                            });
                        }
                    });
                }
            }
        });
    }
};

exports.singleBlog = (req, res) => {
    res.json(req.blog);
};

exports.updateBlog = (req, res) => {
    if (!req.query.id || req.query.id == "") {
        res.status(200).send({
            status: "error",
            message: "Enter category id",
            token: req.token,
        });
    } else {
        upload(req, res, function (error) {
            if (error) {
                var where = {};
                where["_id"] = req.query.id;
                Blog.findOneAndUpdate(
                    where,
                    {
                        title: req.query.title,
                        blog_category: req.query.blog_category,
                        description: req.body.html,
                        //file: ""
                    },
                    {
                        new: true,
                    }
                )
                    .exec()
                    .then((response) => {
                        res.status(200).send({
                            status: "success",
                            message: "Blog has been updated",
                            token: req.token,
                        });
                        return;
                    });
                ////
            } else {
                var where = {};
                where["_id"] = req.query.id;
                var updatedata = {};
                updatedata["title"] = req.query.title;
                updatedata["description"] = req.body.html;
                updatedata["blog_category"] = req.query.blog_category;
                if (req.files[0]) {
                    updatedata["image"] = req.files[0].location;
                }

                Blog.findOneAndUpdate(where, updatedata, {
                    new: true,
                })
                    .exec()
                    .then((response) => {
                        res.status(200).send({
                            status: "success",
                            message: "Blog has been updated..",
                            token: req.token,
                        });
                    });
            }
        });
    }
};

exports.viewBlog = (req, res) => {
    Blog.find()
        .populate("blog_category")
        .sort("-createdAt")
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }
            res.json(data);
        });
};

exports.deleteBlog = (req, res) => {
    let blog = req.blog;
    blog.remove((err, deletedBlog) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        res.json({
            message: "Blog Deleted Successfully",
        });
    });
};

exports.createAdvertise = (req, res) => {
    upload(req, res, function (error) {
        if (error) {
            var advertiseData = new AdvertiseModel({
                url: req.body.url,
            });
            advertiseData.save(function (err, response) {
                if (err) {
                    res.status(200).send({
                        status: "error",
                        message: err,
                        token: req.token,
                    });
                } else {
                    res.status(200).send({
                        status: "success",
                        message: `Advertisement has been created successfully.`,
                    });
                }
            });
        } else {
            if (req.files.length > 0) {
                var advertiseData = new AdvertiseModel({
                    url: req.body.url,
                    image: req.files[0].location,
                });
                advertiseData.save(function (err, response) {
                    if (err) {
                        res.status(200).send({
                            status: "error",
                            message: err,
                            token: req.token,
                        });
                    } else {
                        res.status(200).send({
                            status: "success",
                            message: "Advertise has been created successfully.",
                        });
                    }
                });
            } else {
                var advertiseData = new AdvertiseModel({
                    url: req.body.url,
                });

                advertiseData.save(function (err, response) {
                    if (err) {
                        res.status(200).send({
                            status: "error",
                            message: err,
                            token: req.token,
                        });
                    } else {
                        res.status(200).send({
                            status: "success",
                            message: "Advertise has been created successfully.",
                        });
                    }
                });
            }
        }
    });
};

exports.viewAdvertise = (req, res) => {
    AdvertiseModel.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }

        res.status(200).send({
            status: "success",
            data: data.reverse(),
        });
    });
};

exports.removeAdvertise = (req, res) => {
    if (req.body.id || req.query.id) {
        AdvertiseModel.findByIdAndDelete(
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
                        message: "Advertisement deleted successfully",
                    });
                }
            }
        );
    } else {
        res.status(200).send({
            status: "error",
            message: "Please provide the id",
        });
    }
};

exports.updateAdvertisement = (req, res) => {
    if (!req.query.id || !req.query.id) {
        res.status(200).send({
            status: "error",
            message: "Enter Advertisement id",
            token: req.token,
        });
    } else {
        upload(req, res, function (error) {
            if (error) {
                var where = {};
                where["_id"] = req.query.id || req.body.id;
                AdvertiseModel.findOneAndUpdate(
                    where,
                    {
                        url: req.body.url,
                    },
                    {
                        new: true,
                    }
                )
                    .exec()
                    .then((response) => {
                        res.status(200).send({
                            status: "success",
                            message: "Advertisment has been updated",
                            token: req.token,
                        });
                        return;
                    });
                ////
            } else {
                var where = {};
                where["_id"] = req.query.id || req.body.id;

                var updatedata = {};
                updatedata["url"] = req.query.url || req.body.url;

                if (req.files[0]) {
                    updatedata["image"] = req.files[0].location;
                }

                AdvertiseModel.findOneAndUpdate(where, updatedata, {
                    new: true,
                })
                    .exec()
                    .then((response) => {
                        res.status(200).send({
                            status: "success",
                            message: "Advertisement has been updated..",
                            token: req.token,
                        });
                    });
            }
        });
    }
};

exports.findSingleAdvertisement = (req, res) => {
    if (req.body.id || req.query.id) {
        let where = {};
        where["_id"] = req.body.id || req.query.id;
        AdvertiseModel.findOne(where)
            .then((response) => {
                res.status(200).send({
                    status: "success",
                    data: response,
                });
            })
            .catch((err) => console.log(err));
    } else {
        res.status(200).send({
            status: "error",
            message: "Please provide the id",
        });
    }
};

exports.ReviewNoteCreate = (req, res) => {
    if (req.body.review) {
        let where = {};
        where["_id"] = req.body.review || req.query.review;

        ReviewModel.find(where).then((response) => {
            if (response != "") {
                var reviewNoteData = new ReviewNoteModel({
                    review: req.body.review,
                    note: req.body.note,
                });

                reviewNoteData.save(function (err, response) {
                    if (err) {
                        res.status(200).send({
                            status: "error",
                            message: err,
                            token: req.token,
                        });
                    } else {
                        res.status(200).send({
                            status: "success",
                            message: `Review note created`,
                        });
                    }
                });
            }
        });
    } else {
        res.status(200).send({
            status: "error",
            message: `Please enter a valid review id.`,
        });
    }
};

exports.viewReviewNote = (req, res) => {
    if (req.body.review) {
        let where = {};
        where["review"] = req.body.review || req.query.review;
        ReviewNoteModel.find(where)
            .populate("review")
            .then((response) => {
                if (response) {
                    res.status(200).send({
                        status: "success",
                        data: response,
                    });
                }
            });
    } else {
        res.status(200).send({
            status: "error",
            message: `Please enter a valid review id.`,
        });
    }
};
