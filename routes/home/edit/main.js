const express = require("express");
const app = express.Router();
const checkAuthenticated = require("../../../auth/check-auth")
  .checkAuthenticated;

app.get("/", checkAuthenticated, (req, res) => {
  res.render("home/edit/edit.ejs");
});

const editCollectionRouter = require("./collection");
app.use("/collection", editCollectionRouter);

const editItemRouter = require("./item");
app.use("/item", editItemRouter);

module.exports = app;
