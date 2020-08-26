const express = require("express");
const app = express.Router();
const checkAuthenticated = require("../../../auth/check-auth")
  .checkAuthenticated;
const Collection = require("../../../db/db").Collection;

app.get("/", checkAuthenticated, (req, res) => {
  res.render("home/create/collection.ejs");
});

app.post("/", checkAuthenticated, async (req, res) => {
  const { name, description } = req.body;
  const user = await req.user;
  let newCollection = new Collection({
    name: name,
    description: description,
    user: user,
    items: [],
  });
  newCollection
    .save()
    .catch((err) => res.send("There was an error saving your collection"));
  res.redirect("/create");
});

module.exports = app;
