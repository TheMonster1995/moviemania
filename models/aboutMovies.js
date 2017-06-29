var mongoose = require("mongoose");

var aboutmoviesSchema = new mongoose.Schema({
        movies: Array
    });
    
module.exports =  mongoose.model("AboutMovie", aboutmoviesSchema);