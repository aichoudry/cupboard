const express = require("express");
const { Item, Collection } = require("../../../db/db");
const { request } = require("express");
const app = express.Router();
const checkAuthenticated = require("../../../auth/check-auth")
  .checkAuthenticated;

app.get("/", checkAuthenticated, async (req, res) => {
  const user = await req.user;
  const collections = await Collection.find({ user }).populate("items");
  const items = await Item.find({ user });
  res.render("home/view/view.ejs", {
    items,
    collections,
    itemsStr: JSON.stringify(items),
    collectionsStr: JSON.stringify(collections),
  });
});

// app.post("/", checkAuthenticated, async (req, res) => {
//   const user = await req.user;
//   const input = await req.body.input;
//   const collections = await Collection.find({
//     user,
//     name: { $regex: input, $options: "i" },
//   }).populate("items");
//   const items = await Item.find({ user });
//   console.log(items.splice(0, 1), collections);
//   res.render("home/view/view.ejs", { items: items.splice(0, 1), collections });
// });

module.exports = app;
