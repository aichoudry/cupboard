const express = require("express");
const { Collection, Item } = require("../../../db/db");
const app = express.Router();
const checkAuthenticated = require("../../../auth/check-auth")
  .checkAuthenticated;

app.get("/", checkAuthenticated, (req, res) => {
  res.render("home/create/item.ejs");
});

app.post("/", checkAuthenticated, async (req, res) => {
  const { name, description, tags, location } = req.body;
  const user = await req.user;
  /*
    Create the item with name/desc
      [x] if the location doesn't exist, create one
      split the tags by comma
        if a tag document made by the same user with the same name exists,
        use that document, otherwise create a new one
  */
  let tagsList = tags.split(",").filter((tag) => tag.trim() != "");
  let newItem = new Item({
    name,
    description,
    tags: tagsList,
    location,
    user,
  });

  newItem.save();

  res.redirect("/create");
});

module.exports = app;
