var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
    title: String,
    imgURL: {
        type: String,
        default: "http://www.frankmio.com/testsiteM/images/moviemania_1.jpg"
    },
    description: {
        type: String,
        default: "No description for this movie has been added!!!"
    },
    watched: {
        type: Boolean,
        default: false
    },
    submittedby: String,
    submittedat: {
        type: Date,
        default: Date.now()
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

module.exports = mongoose.model("Movie", movieSchema);