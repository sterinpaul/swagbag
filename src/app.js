const express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongoose");

const app = express();
var cors = require("cors");
app.use(cors());
app.options("*", cors());

// MongoClient.connect("mongodb+srv://gifsocial:2MZzsmmGjZXfEaRB@cluster0.mg3fr.mongodb.net/t2p?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology: true},function(){
//     console.log('connected');
// });

MongoClient.connect(
    //mongodb+srv://swagbag:SwagBag786@cluster0.odmj4.mongodb.net/test?authSource=admin&replicaSet=atlas-14m0hi-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
    "mongodb+srv://swagbag:SwagBag786@cluster0.odmj4.mongodb.net/store?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (error) {
        if (error) {
            console.log("not connected");
        } else {
            console.log("connected");
        }
    }
);

MongoClient.set("useFindAndModify", false);
MongoClient.set("useCreateIndex", true);

app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "10mb",
        parameterLimit: 100000,
    })
);
app.use(bodyParser.json());

app.use(express.static("uploads"));
process.env.TZ = "Asia/Kolkata"; // here is the magical line
require("./router/api.js")(app);
require("./router/admin.js")(app);
require("./router/Blog.js")(app);
require("./router/frontRoute.js")(app);
require("./router/user.js")(app);
require("./router/RoleAndPermissions.js")(app);
require("./router/report.js")(app);
require("./router/ContactNow.js")(app);

var time = new Date().getHours();
var OrderOtherNoteModel = require("./models/OrderOtherNoteModel")
if (time == 00) {
    // console.log(time)
    OrderOtherNoteModel.find().then(response => {
        for (var i = 0; i < response.length; i++) {
            if (response[i].customer_type == "New") {
                OrderOtherNoteModel.findByIdAndUpdate({
                    _id: response[i]._id
                }, { customer_type: "Unresolved" },
                    { new: true, useFindAndModify: false }, (err, data) => {
                        if (err) {
                            return;
                        }
                    });
            }
        }
    });
};

module.exports = app;
