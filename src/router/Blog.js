const { 
    createBlogCategory, 
    updateBlogCategory, 
    blogCategoryById, 
    viewBlogCategory, 
    deleteBlogCategory, 
    viewBlog, 
    createBlog, 
    updateBlog, 
    blogById, 
    deleteBlog, 
    singleBlog, 
    createAdvertise, 
    viewAdvertise, 
    removeAdvertise, 
    updateAdvertisement, 
    findSingleAdvertisement,
     ReviewNoteCreate, 
     viewReviewNote 
    } = require("../controllers/Blog")

module.exports = function (app) {
    const { check } = require("express-validator");
    const jwt = require("jsonwebtoken");
    const JWT_SECRET = "krishna";

    function generateAccessToken(key) {
        // expires after half and hour (1800 seconds = 30 minutes)
        const accessToken = jwt.sign({ mobile: key }, JWT_SECRET, { expiresIn: "180000s" });
        return accessToken;
    }

    function authenticateToken(req, res, next) {
        //const JWT_SECRET = process.env.JWT_SECRET;
        // Gather the jwt access token from the request header
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[0];
        //console.log(authHeader.split(' '));
        if (token == null) return res.sendStatus(200); // if there isn't any token

        jwt.verify(token, JWT_SECRET, (err, mobile) => {
            if (err) return res.sendStatus(200);
            req.token = generateAccessToken(mobile);
            next(); // pass the execution off to whatever request the client intended
        });
    }

    app
        .get("/api/view-blog-category", viewBlogCategory)
        .post("/api/create-blog-category", createBlogCategory)
        .put("/api/update-blog-category/:blogCategoryId", updateBlogCategory)
        .delete("/api/delete-blog-category/:blogCategoryId", [], deleteBlogCategory)
        .param('blogCategoryId', blogCategoryById)
        .get("/api/view-blog", viewBlog)
        .get("/api/view-1blog/:blogId", singleBlog)
        .post("/api/create-blog", createBlog)
        .post("/api/update-blog", updateBlog)
        .delete("/api/delete-blog/:blogId", deleteBlog)
        .post("/admin/create-advertisement", createAdvertise)
        .get("/api/fetch-advertisement", viewAdvertise)
        .post("/admin/remove-advertisement", removeAdvertise)
        .post("/admin/update-advertisement", updateAdvertisement)
        .post("/api/find-single-advertisement", findSingleAdvertisement)
        .param("blogId", blogById)
        .post("/admin/create-review-note", ReviewNoteCreate)
        .post("/admin/view-review-note", viewReviewNote)

}