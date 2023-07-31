const { create, view, deleteContactNow } = require("../controllers/ContactNow");

module.exports = function (app) {
    app
        .post("/api/create-contact-now", create)
        .post("/admin/view-contact-now",view)
        .post("/admin/delete-contact-now",deleteContactNow)
};