var Movie = require("../models/movie"),
    Note    = require("../models/note");
var middObj = {};

middObj.isLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect("/users/login");
    } else {
        return next();
    }
}

middObj.notLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/movies");
    } else {
        return next();
    }
}

middObj.noteOwnership = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect("/users/login");
    } else {
        Note.findById(req.params.noteid, function (err, foundNote) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                if (foundNote.author.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    }
};

middObj.movieOwnership = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect("/users/login");
    } else {
        Movie.findById(req.params.id, function (err, foundMovie) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                if (foundMovie.submittedby == req.user.username) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    }
};

module.exports = middObj;