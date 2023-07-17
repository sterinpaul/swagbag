var mongoose = require("mongoose");
require('mongoose-double')(mongoose);

var UnitSchema = mongoose.Schema({
    name: {
        type: String,
        default: ""
    }
});
module.exports = mongoose.model('units', UnitSchema);