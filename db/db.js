require("dotenv").config();
const mongoose = require("mongoose");
const mongoURL = process.env.MONGODBURL;
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const userSchema = require("./schemas/User");
const User = mongoose.model("User", userSchema);

const collectionSchema = require("./schemas/Collection");
const Collection = mongoose.model("Collection", collectionSchema);

const itemSchema = require("./schemas/Item");
const Item = mongoose.model("Item", itemSchema);

module.exports = { User, Collection, Item };
