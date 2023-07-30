const mongoose = require("mongoose");

const inserviceAreaSchema = new mongoose.Schema({
  city_name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default:true
  },
},{timestamps:true});

module.exports = InserviceArea = mongoose.model("inserviceArea",inserviceAreaSchema)