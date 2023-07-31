const { userById, singleUser, updateUser, showOrders, showAdresses, updateAddress, addressById, removeAddress, updateAddressStatus } = require("../controllers/user");

module.exports = function (app) {
    var AdminController = require("../controllers/AdminController");
    var AdminController = require("../controllers/AdminController");

    const { check } = require("express-validator");
    const jwt = require("jsonwebtoken");
    const JWT_SECRET = "krishna";

    function generateAccessToken(key) {
        // expires after half and hour (1800 seconds = 30 minutes)
        const accessToken = jwt.sign({ mobile: key }, JWT_SECRET, { expiresIn: "180000s" });
        return accessToken;
    }

    function authenticateToken(req, res, next) {
        next();
        //const JWT_SECRET = process.env.JWT_SECRET;
        // Gather the jwt access token from the request header
        // const authHeader = req.headers["authorization"];
        // const token = authHeader && authHeader.split(" ")[0];
        // //console.log(authHeader.split(' '));
        // if (token == null) return res.sendStatus(200); // if there isn't any token

        // jwt.verify(token, JWT_SECRET, (err, mobile) => {
        //     if (err) return res.sendStatus(200);
        //     req.token = generateAccessToken(mobile);
        //     next(); // pass the execution off to whatever request the client intended
        // });
    }

    app
        .get("/api/single-user/:userId", authenticateToken, singleUser)
        .put("/api/user-update/:userId", authenticateToken, updateUser)
        .get("/api/order-user", authenticateToken, showOrders)
        // .get("/api/address-user", authenticateToken, showAdresses)
        // .put("/api/address-update/:addressById", authenticateToken, updateAddress)
        // .delete("/api/delete-user-address/:addressById", authenticateToken, removeAddress)
        // .param("addressById", addressById)
        .post("/api/update-adddress-status", updateAddressStatus)
        .param("userId", userById);
};
