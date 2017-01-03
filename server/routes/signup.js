// Dependencies.
const mongoose = require('mongoose'); // Database driver.
const rfr = require('rfr'); // Root-relative paths.

// Other modules.
const hashing = rfr('/server/common/hashing');  // Hash and salt functions.
const MSG = rfr('/server/messages/index');// Response error/success messages.
const REGEX = rfr('/server/regex/index'); // Regular expressions.
const User = rfr('/server/models/User');  // User database model.
const DBCONFIG = rfr('/server/config/database');  // Database config.

/*
 *
 *
 *  Database connection.
 *
 *
 */
// Use mongoose promises.
mongoose.Promise = global.Promise;

// Connect to database.
mongoose.createConnection(DBCONFIG.CONNSTRING);

/*
 *
 *
 *  Route definition.
 *
 *
 */
const signup = (req, res, next) => {
  // Extract username and password from the request body.
  const username = req.body.username; // Username.
  const password1 = req.body.password1; // Password.
  const password2 = req.body.password2; // Password confirmation.

  // Check if username/password is provided.
  if (!username || (!password1 && !password2)) {
    return next(MSG.ERROR.SIGNUP.MISSING_CREDENTIALS);
  }

  // Check if username is valid.
  if (!REGEX.USERNAME.test(username)) {
    return next(MSG.ERROR.SIGNUP.INVALID_USERNAME);
  }

  // Check if password is valid.
  if (!REGEX.PASSWORD.test(password1) || !REGEX.PASSWORD.test(password2)) {
    return next(MSG.ERROR.SIGNUP.INVALID_PASSWORD);
  }

  // Check if both passwords are provided.
  if ((password1 && !password2) || (!password1 && password2)) {
    return next(MSG.ERROR.SIGNUP.MISSING_PASSWORD_CONFIRMATION);
  }

  // Check if both passwords match.
  if (password1 !== password2) {
    return next(MSG.ERROR.SIGNUP.PASSWORD_MISMATCH);
  }

  // Use password1 for registration.
  const password = password1;

  // Search the users collection to see if it exists.
  User.findOne({ username: { $regex: new RegExp(username, 'i') } }, (err, result) => {
    // Database error check.
    if (err) {
      return next(MSG.ERROR.DB.DB_ERROR);
    }

    // Check if user already exists.
    if (result) {
      return next(MSG.ERROR.SIGNUP.USER_EXISTS);
    }

    /*
     *  User does not exist.
     *  Create a new user.
     */

    // Generate a salt based on the length of the provided password
    const salt = hashing.generateSalt(password.length);

    // Create a new user with the provided username, store salted and hashed password.
    const newUser = User({
      username,
      password: hashing.generateHashedPassword(password, salt),
    });

    // Save the new user into the database.
    newUser.save((errNewUserResult, newUserResult) => {
      // Database error check.
      if (errNewUserResult) {
        return next(MSG.ERROR.DB.DB_ERROR);
      }

      // Response payload.
      const payload = {
        username,                     // Username.
        userID: newUserResult['_id'], // Document ID.
      };

      // Return success message with payload.
      return res.send(Object.assign({}, MSG.SUCCESS.SIGNUP.USER_CREATED, { payload }));
    });

    // Required to keep linter happy.
    return true;
  });

  // Required to keep linter happy.
  return true;
};

// Export route.
module.exports = signup;
