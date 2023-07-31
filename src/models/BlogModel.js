const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const blogModelSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            default: "",
        },
        blog_category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BlogCategory",
            default: null,
        },
    },
    { timestamps: true }
);
blogModelSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=title%>" });
module.exports = mongoose.model("Blog", blogModelSchema);
