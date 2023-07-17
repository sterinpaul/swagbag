var mongoose = require("mongoose");
var SectionImage = mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    url: {
        type: String,
        default: "",
    },
    section: {
        type: Number,
    },
    page: {
        type: String,
        default: "",
    },
    template: {
        type: String,
        default: "",
    },
    file: {
        type: String,
        default: "",
    },
});
module.exports = mongoose.model("section_images", SectionImage);
