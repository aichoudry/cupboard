const express = require("express");
const app = express.Router();
const checkAuthenticated = require("../../../auth/check-auth")
  .checkAuthenticated;

app.get("/", checkAuthenticated, (req, res) => {
  res.render("home/create/create.ejs");
});

const createCollectionRouter = require("./collection");
app.use("/collection", createCollectionRouter);

const createItemRouter = require("./item");
app.use("/item", createItemRouter);

module.exports = app;
