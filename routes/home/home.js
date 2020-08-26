const express = require("express");
const app = express.Router();
const checkAuthenticated = require("../../auth/check-auth").checkAuthenticated;

app.get("/", checkAuthenticated, async (req, res) => {
  let user = await req.user;
  res.render("home/index.ejs", { name: user.name });
});

module.exports = app;
