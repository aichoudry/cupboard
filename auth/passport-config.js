// Strategy for local authentication
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt");

/*
passport: the passport module
getUserByEmail: method that returns null if a user does not exist with a given email,
  otherwise returns the user object
getUserById: method that returns null if a user does not exist with a given id,
  otherwise returns the user object
*/
function initialize(passport, getUserByEmail, getUserById) {
  // Function that authenticates a given user
  const authenticateUser = async (email, password, done) => {
    // Finds the user with email of <email>, otherwise returns null
    const user = await getUserByEmail(email);
    // No user with that email
    if (user == null) {
      return done(null, false, { message: "Incorrect credentials" });
    }
    bcrypt
      // Compares the passwords
      .compare(password, user.password)
      // Returns a result depending on if the user's password is valid
      .then((result) => {
        result
          ? done(null, user)
          : done(null, false, { message: "Password incorrect" });
      })
      // Send the error if one occurs
      .catch((error) => done(error));
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );

  // Saves the ID in a session
  passport.serializeUser((user, done) => done(null, user._id));

  // Retrives the ID from the session
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
}

module.exports = initialize;
