const { masterList, sectionImage } = require("../controllers/FrontController")

module.exports = function (app) {
    app 
      .get("/api/view-master-images",masterList)
      .get("/api/view-section-images",sectionImage)

}