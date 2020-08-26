const express = require("express");
const app = express.Router();
const passport = require("passport");
const checkNotAuthenticated = require("../../auth/check-auth")
  .checkNotAuthenticated;

app.get("/", checkNotAuthenticated, (req, res) => {
  res.render("auth/login.ejs");
});

app.post(
  "/",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = app;
