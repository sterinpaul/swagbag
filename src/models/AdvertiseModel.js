const mongoose = require('mongoose');

const advertiseSchema = new mongoose.Schema({
    image: {
        type: String,
        default: "",
    },
    url: {
        type: String,
        default: "",
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Advertise',advertiseSchema);