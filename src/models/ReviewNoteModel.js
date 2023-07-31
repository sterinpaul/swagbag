var mongoose = require("mongoose");

var ReviewNoteSchema = mongoose.Schema({
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reviews',
        default: null
    },
    note: {
        type: String,
        default: ""
    },
},
    { timestamps: true }
);
module.exports = mongoose.model('review_notes', ReviewNoteSchema);