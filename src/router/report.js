const {
    orderReport,
    orderCount,
    highestOrder,
    lowestOrder,
    totalCustomersCount,
    totalProductsCount,
    totalSales,
    totalOrdersPending,
    // orderPacking,
    // orderShipping,
    // gst,
    // averageOrderValue,
    // codAmount,
    // digitalAmount,
    // maxOrderFoodItems,
    // readsingleuserData,
    allReport,
} = require("../controllers/report");

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

    app.post("/orderreport", [], orderReport).post("/ordercount", [], orderCount).post("/maxordervalue", [], highestOrder).post("/minordervalue", [], lowestOrder).post("/admin/total-customer-count", [], totalCustomersCount).post("/admin/total-product-count", [], totalProductsCount).post("/admin/total-sales", [], totalSales).post("/admin/total-pending-orders", [], totalOrdersPending).post("/admin/allreport", [], allReport);
    // .post("/orderpacking", [], authenticateToken, orderPacking)
    // .post("/ordershipping", [], authenticateToken, orderShipping)
    // .post("/gst", [], authenticateToken, gst)
    // .post("/averageOrderValue", [], authenticateToken, averageOrderValue)
    // .post("/codAmount", [], authenticateToken, codAmount)
    // .post("/digitalAmount", [], authenticateToken, digitalAmount)
    // .post("/maxOrderProducts", [], authenticateToken, maxOrderFoodItems)
    // .post("/findsingleuser", [], authenticateToken, readsingleuserData);

    // .post('/createroleandpermission', create)
    // .put('/updateboth/:bothId',updateBoth)
    // .delete('/delete/:bothId',deleteRole)
    // .param('bothId',bothById)
};

// .get('/countrole/:bothId',countRoleAssigned)
