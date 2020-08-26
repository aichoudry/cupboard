const express = require("express");
const app = express.Router();
const checkAuthenticated = require("../../../auth/check-auth")
  .checkAuthenticated;
const { Item, Collection } = require("../../../db/db");

app.get("/", checkAuthenticated, async (req, res) => {
  const user = await req.user;
  const items = await Item.find({ user });
  const collections = await Collection.find({ user });
  let disablePost = items.length == 0 || collections.length == 0;
  res.render("home/remove/item-from-collection.ejs", {
    items,
    collections,
    disablePost,
  });
});

app.post("/", checkAuthenticated, async (req, res) => {
  const { items, collections } = req.body;
  const itemsToDelete = Array.isArray(items) ? items : [items];
  let selectedCollection = await Collection.findById(collections);
  let newItems = selectedCollection.items.filter((id) =>
    itemsToDelete.includes(id)
  );
  Collection.findByIdAndUpdate(collections, { items: newItems }, (err, doc) =>
    console.log(err, doc)
  );
  res.redirect("/remove");
});

module.exports = app;
