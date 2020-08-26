const express = require("express");
const { Item } = require("../../../db/db");
const app = express.Router();
const checkAuthenticated = require("../../../auth/check-auth")
  .checkAuthenticated;
const Collection = require("../../../db/db").Collection;

app.get("/", checkAuthenticated, async (req, res) => {
  let user = await req.user;
  let collections = await Collection.find({ user });
  let items = await Item.find({ user });
  if (collections.length === 0) {
    res.render("home/edit/collection.ejs", {
      collections: [
        {
          name: "No collections found!",
          description: "Add a collection first before editing one!",
          _id: "1",
        },
      ],
      disablePost: true,
      items,
    });
  } else {
    res.render("home/edit/collection.ejs", {
      collections,
      disablePost: false,
      items,
    });
  }
});

app.post("/", checkAuthenticated, async (req, res) => {
  const { collections, description, items, name } = req.body;
  const itemsList = Array.isArray(items) ? items : [items];
  const foundCollection = await Collection.findById(collections);
  const newItems = itemsList.concat(
    // @ts-ignore
    foundCollection.items.filter((id) => itemsList.indexOf(id) < 0)
  );
  Collection.findByIdAndUpdate(
    collections,
    {
      description: description,
      name: name,
      items: newItems,
    },
    (err, docs) => console.log(err, docs)
  );
  res.redirect("/edit");
});

module.exports = app;
