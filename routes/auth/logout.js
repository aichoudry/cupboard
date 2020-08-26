const express = require("express");
const app = express.Router();

app.post("/", (req, res) => {
  req.session.destroy((err) => res.redirect("login"));
});

module.exports = app;
