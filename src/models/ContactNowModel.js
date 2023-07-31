const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ContactNowModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },

        contact_number: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            default: "",
        },
        message: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);
ContactNowModel.plugin(mongooseSlugPlugin, { tmpl: "<%=subject%>" });
module.exports = mongoose.model("contactNow", ContactNowModel);
