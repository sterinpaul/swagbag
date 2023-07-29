const mongoose = require("mongoose");

const inserviceAreaSchema = new mongoose.Schema({
  country_name: {
    type: String,
    required: true,
  },
  country_code: {
    type: String,
    required: true,
  },
},{timestamps:true});

module.exports = InserviceArea = mongoose.model("inserviceArea",inserviceAreaSchema)