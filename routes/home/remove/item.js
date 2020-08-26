const express = require("express");
const app = express.Router();
const checkAuthenticated = require("../../../auth/check-auth")
  .checkAuthenticated;
const { Item } = require("../../../db/db");

app.get("/", checkAuthenticated, async (req, res) => {
  const user = await req.user;
  const items = await Item.find({ user });
  let disablePost = items.length == 0;
  res.render("home/remove/item.ejs", { items, disablePost });
});

app.post("/", checkAuthenticated, async (req, res) => {
  const { items } = req.body;
  console.log(items);
  Item.findByIdAndDelete(items, (err, docs) => console.log(err, docs));
  res.redirect("/remove");
});

module.exports = app;
