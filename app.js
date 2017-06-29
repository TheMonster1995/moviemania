var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    flash = require("connect-flash"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    passportLM = require("passport-local-mongoose"),
    session = require("express-session"),
    userRoutes = require("./routes/user"),
    movieRoutes = require("./routes/index"),
    User = require("./models/user"),
    Movie = require("./models/movie"),
    middleware = require("./middlware"),
    AboutMovies = require("./models/aboutMovies");

var dbURL = "mongodb://admin:FunAdmin95@ds143362.mlab.com:43362/moviemania";
mongoose.connect(dbURL);

app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
    secret: "Movies are awesome",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.flash = req.flash();
    next();
});
app.use("/movies", movieRoutes);
app.use("/users", userRoutes);

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", middleware.notLoggedIn, function (req, res) {
    res.render("landing");
})

app.get("/about", function (req, res) {
    AboutMovies.find("", function (err, results) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            var chosenMovie = results[0].movies[Math.floor(Math.random()*9)];
            res.render("about", {movie: chosenMovie});
        }
    })
})

app.listen(process.env.PORT, process.env.ID, function () {
    // console.log(process.env.DATABASEURL);
    // var aboutmoviesSchema = new mongoose.Schema({
    //     movies: Array
    // });
    // var AboutMovies = mongoose.model("AboutMovie", aboutmoviesSchema);
    // AboutMovies.create({
    //     movies:[
    //         "http://www.fatmovieguy.com/wp-content/uploads/2014/06/The-Judge-Movie-Poster.jpg",
    //         "https://s-media-cache-ak0.pinimg.com/736x/da/3b/be/da3bbe3597cdc8b787b8a2577ecfc3cf.jpg",
    //         "https://s-media-cache-ak0.pinimg.com/736x/c1/ab/78/c1ab782b93344350aa968604dbfdc9d8--fun-recipes-jodie-foster.jpg",
    //         "https://assets.mubi.com/images/notebook/post_images/22621/images-w1400.jpg?1481167057",
    //         "https://s-media-cache-ak0.pinimg.com/736x/06/cb/33/06cb338efcf3ac37a90caad05fd356a2--saving-private-ryan-matt-damon.jpg",
    //         "https://s-media-cache-ak0.pinimg.com/736x/36/fe/2c/36fe2cd41adb3eac8eeed2c678a97d9c.jpg",
    //         "http://www.topdesignmag.com/wp-content/uploads/2011/04/lord-war-creative-movie-posters.jpg",
    //         "http://www.posterposter.org/wp-content/uploads/2016/09/3-arrival-movie-poster-embarrassing-photoshop-fail.jpg",
    //         "http://cdn.collider.com/wp-content/uploads/Inception-movie-poster-7.jpg"
    //     ]
    // }, function (err, result) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("DONE!!!!!!!!!!!!!!!!!!");
    //         console.log(result);
    //     }
    // });
    console.log("The Server is Running ...");
});




// "http://www.fatmovieguy.com/wp-content/uploads/2014/06/The-Judge-Movie-Poster.jpg",
//             "https://s-media-cache-ak0.pinimg.com/736x/da/3b/be/da3bbe3597cdc8b787b8a2577ecfc3cf.jpg",
//             "https://s-media-cache-ak0.pinimg.com/736x/c1/ab/78/c1ab782b93344350aa968604dbfdc9d8--fun-recipes-jodie-foster.jpg",
//             "https://assets.mubi.com/images/notebook/post_images/22621/images-w1400.jpg?1481167057",
//             "https://s-media-cache-ak0.pinimg.com/736x/06/cb/33/06cb338efcf3ac37a90caad05fd356a2--saving-private-ryan-matt-damon.jpg",
//             "https://s-media-cache-ak0.pinimg.com/736x/36/fe/2c/36fe2cd41adb3eac8eeed2c678a97d9c.jpg",
//             "http://www.topdesignmag.com/wp-content/uploads/2011/04/lord-war-creative-movie-posters.jpg",
//             "http://www.posterposter.org/wp-content/uploads/2016/09/3-arrival-movie-poster-embarrassing-photoshop-fail.jpg",
//             "http://cdn.collider.com/wp-content/uploads/Inception-movie-poster-7.jpg"