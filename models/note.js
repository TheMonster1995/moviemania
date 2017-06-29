var mongoose = require("mongoose");

var noteSchema = new mongoose.Schema({
    note: String,
    submitted: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Note", noteSchema);