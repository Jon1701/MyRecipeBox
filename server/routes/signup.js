// Dependencies.
const mongoose = require('mongoose'); // Database driver.
const rfr = require('rfr'); // Root-relative paths.

// Other modules.
const hashing = rfr('/server/common/hashing');  // Hash and salt functions.
const REGEX = rfr('/server/regex/index'); // Regular expressions.
const User = rfr('/server/models/User');  // User database model.

// Success/Error Response messages.
const MSG = (code) => {
  const messages = {
    MISSING_CREDENTIALS: 'Both a username and password are required.',
    INVALID_USERNAME: 'Invalid username. Valid characters are letters, numbers, and underscore. Must be between 8 and 25 characters long.',
    INVALID_PASSWORD: 'Invalid password. Valid characters are letters, numbers, and underscore. Must be between 8 and 50 characters long.',
    PASSWORD_MISMATCH: 'Passwords do not match.',
    MISSING_PASSWORD_CONFIRMATION: 'Both password and password confirmation are required.',
    USER_EXISTS: 'User already exists.',
    DB_ERROR: 'Database error.',
    USER_CREATED: 'User successfully created.',
  };

  // Return message as an Object.
  return {
    code,
    message: messages[code],
  };
};


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
    return next(MSG('MISSING_CREDENTIALS'));
  }

  // Check if username is valid.
  if (!REGEX.USERNAME.test(username)) {
    return next(MSG('INVALID_USERNAME'));
  }

  // Check if password is valid.
  if (!REGEX.PASSWORD.test(password1) || !REGEX.PASSWORD.test(password2)) {
    return next(MSG('INVALID_PASSWORD'));
  }

  // Check if both passwords are provided.
  if ((password1 && !password2) || (!password1 && password2)) {
    return next(MSG('MISSING_PASSWORD_CONFIRMATION'));
  }

  // Check if both passwords match.
  if (password1 !== password2) {
    return next(MSG('PASSWORD_MISMATCH'));
  }

  // Use password1 for registration.
  const password = password1;

  // Search the users collection to see if it exists.
  User.findOne({ username: { $regex: new RegExp(username, 'i') } }, (err, result) => {
    // Database error check.
    if (err) {
      return next(MSG('DB_ERROR'));
    }

    // Check if user already exists.
    if (result) {
      return next(MSG('USER_EXISTS'));
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
        return next(MSG('DB_ERROR'));
      }

      // Response payload.
      const payload = {
        username,                     // Username.
        userID: newUserResult['_id'], // Document ID.
      };

      // Return success message with payload.
      return res.send(Object.assign({}, MSG('USER_CREATED'), { payload }));
    });

    // Required to keep linter happy.
    return true;
  });

  // Required to keep linter happy.
  return true;
};

// Export route.
module.exports = signup;
