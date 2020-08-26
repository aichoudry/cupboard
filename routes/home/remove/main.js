const express = require("express");
const app = express.Router();
const checkAuthenticated = require("../../../auth/check-auth")
  .checkAuthenticated;
const { Item, Collectiond } = require("../../../db/db");

app.get("/", checkAuthenticated, (req, res) => {
  res.render("home/remove/remove.ejs");
});

const removeCollectionRouter = require("./collection");
app.use("/collection", removeCollectionRouter);

const removeItemRouter = require("./item");
app.use("/item", removeItemRouter);

const removeItemFromCollection = require("./item-from-collection");
app.use("/item-from-collection", removeItemFromCollection);

module.exports = app;
