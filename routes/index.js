var express = require("express");
var router = express.Router({mergeParams: true});
var User = require("../models/user");
var middleware = require("../middlware");
var Movie = require("../models/movie");
var Note = require("../models/note")

router.get("/", middleware.isLoggedIn, function (req, res) {
    Movie.find({submittedby: req.user.username}, function (err, foundMovies) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {movies: foundMovies});
        }
    })
})

router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("new");
})

router.post("/", middleware.isLoggedIn, function (req, res) {
    var newMovie = new Movie(req.body.movie);
    newMovie.submittedby = req.user.username;
    if (newMovie.imgURL === "") {
        newMovie.imgURL = "http://www.frankmio.com/testsiteM/images/moviemania_1.jpg";
    };
    if (newMovie.description === "") {
        newMovie.description = "No description for this movie has been added!!!";
    };
    newMovie.save(function (err, newMovie) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/movies");
        }
    })
})

router.get("/:id", middleware.movieOwnership, function (req, res) {
    Movie.findById(req.params.id).populate("notes").exec(function (err, foundMovie) {
        if (err) {
            console.log(err);
            res.redirect("/movies");
        } else {
            res.render("single", {movie: foundMovie});
        }
    })
})

router.delete("/:id", middleware.movieOwnership, function (req, res) {
    Movie.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/movies");
        }
    });
})

router.get("/:id/edit", middleware.movieOwnership, function (req, res) {
    Movie.findById(req.params.id, function (err, foundMovie) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("edit", {movie: foundMovie});
        }
    })
})

router.put("/:id", middleware.movieOwnership, function (req, res) {
    Movie.findByIdAndUpdate(req.params.id, req.body.movie, function (err, uppedMovie) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            if (!req.body.movie.watched) {
                uppedMovie.watched = false;
                uppedMovie.save();
            };
            res.redirect("/movies/" + req.params.id);
        }
    })
})

router.post("/:id", middleware.movieOwnership, function (req, res) {
    Movie.findById(req.params.id, function (err, foundMovie) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            req.body.note.author = req.user._id;
            Note.create(req.body.note, function (err, newNote) {
                if (err) {
                    console.log(err);
                } else {
                    foundMovie.notes.push(newNote);
                    foundMovie.save();
                    res.redirect("/movies/" + req.params.id);
                }
            })
        }
    });
})

router.delete("/:id/notes/:noteid", middleware.noteOwnership, function (req, res) {
    Note.findByIdAndRemove(req.params.noteid, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/movies/" + req.params.id);
        }
    })
})

module.exports = router;