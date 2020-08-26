const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const checkNotAuthenticated = require("../../auth/check-auth")
  .checkNotAuthenticated;
const User = require("../../db/db").User;

app.get("/", checkNotAuthenticated, (req, res) => {
  res.render("auth/register.ejs");
});

app.post("/", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    newUser.save();
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});

module.exports = app;
