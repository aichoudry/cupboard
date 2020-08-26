const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 100,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  location: {
    type: String,
  },
  description: {
    type: String,
    minlength: 0,
    maxlength: 255,
  },
  tags: [String],
});

module.exports = itemSchema;
