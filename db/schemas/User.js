const mongoose = require("mongoose");
const validator = require("validator");
const isEmail = validator.default.isEmail;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 22,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, "invalid email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = userSchema;
