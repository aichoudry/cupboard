const express = require("express");
const { Item, Collection } = require("../../../db/db");
const app = express.Router();
const checkAuthenticated = require("../../../auth/check-auth")
  .checkAuthenticated;

app.get("/", checkAuthenticated, async (req, res) => {
  let user = await req.user;
  let itemsList = await Item.find({ user });
  let disablePost = itemsList.length == 0;
  res.render("home/edit/item.ejs", { items: itemsList, disablePost });
});

app.post("/", checkAuthenticated, async (req, res) => {
  const { items, description, tags, name, location } = req.body;
  let tagsList = tags.split(",").filter((tag) => tag.trim() != "");
  console.log(items, tagsList, description);
  Item.findByIdAndUpdate(
    items,
    {
      name: name,
      description: description,
      tags: tagsList,
      location: location,
    },
    (err, docs) => console.log(docs)
  );
  res.redirect("/edit");
});

module.exports = app;
