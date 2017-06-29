var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middlware");

router.get("/signup", middleware.notLoggedIn, function (req, res) {
    res.render("signup");
})

router.post("/signup", middleware.notLoggedIn, function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/users/signup");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/movies");
            })
        }
    })
})

router.get("/login", middleware.notLoggedIn, function (req, res) {
    res.render("login");
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/movies",
    failureRedirect: "/users/login"
}), function (req, res) {})

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("back");
})

module.exports = router;