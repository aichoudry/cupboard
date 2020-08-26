const express = require("express");
const app = express.Router();
const checkAuthenticated = require("../../../auth/check-auth")
  .checkAuthenticated;
const { Collection } = require("../../../db/db");

app.get("/", checkAuthenticated, async (req, res) => {
  const user = await req.user;
  const collections = await Collection.find({ user });
  let disablePost = collections.length == 0;
  res.render("home/remove/collection.ejs", { collections, disablePost });
});

app.post("/", checkAuthenticated, async (req, res) => {
  const { collections } = req.body;
  console.log(collections);
  Collection.findByIdAndDelete(collections, (err, docs) =>
    console.log(err, docs)
  );
  res.redirect("/remove");
});

module.exports = app;
