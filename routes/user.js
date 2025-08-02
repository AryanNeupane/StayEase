const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const User = require('../models/user');
const passport = require('passport');
const router = express.Router();


router.get("/signup", (req, res) => {
 res.render("users/signup");
});

router.post("/signup", wrapAsync(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash("success", "Welcome to StayEase!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
}));


router.get("/login", (req, res) => {
  res.render("users/login");
});



router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/listings"); // or wherever you want after login
  }
);


module.exports = router;