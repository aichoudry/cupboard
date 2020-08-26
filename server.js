require("dotenv").config();
require("./db/db");

const express = require("express");
const app = express();

// Authentication middleware
const passport = require("passport");

// HTML flash messages, i.e Password Incorrect, No user with that email etc.
const flash = require("express-flash");

// Middleware for cookie based sessions
const session = require("express-session");

const users = require("./db/db").User;

// Function from the other file
const initializePassport = require("./auth/passport-config");
initializePassport(
  passport,
  async (email) => await users.findOne({ email }),
  async (id) => await users.findOne({ _id: id })
);

app.set("view-engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Authentication Routes

const loginRouter = require("./routes/auth/login");
app.use("/login", loginRouter);

const registerRouter = require("./routes/auth/register");
app.use("/register", registerRouter);

const logoutRouter = require("./routes/auth/logout");
app.use("/logout", logoutRouter);

// General Routes

const homeRouter = require("./routes/home/home");
app.use("/", homeRouter);

const createRouter = require("./routes/home/create/main");
app.use("/create", createRouter);

const editRouter = require("./routes/home/edit/main");
app.use("/edit", editRouter);

const viewRouter = require("./routes/home/view/main");
app.use("/view", viewRouter);

const removeRouter = require("./routes/home/remove/main");
app.use("/remove", removeRouter);

app.listen(3000);
