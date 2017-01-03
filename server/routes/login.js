// Dependencies.
const mongoose = require('mongoose'); // Database driver.
const jwt = require('jsonwebtoken');  // JSON Web Token.
const rfr = require('rfr'); // Root-relative paths.

// Other dependencies.
const hashing = rfr('/server/common/hashing');  // Hash and salt functions.

// Configuration files.
const MSG = rfr('/server/messages/index');// Response error/success messages.
const JWT_SIGNING_KEY = rfr('/server/config/auth').KEY.JWT_SIGNING_KEY;  // JWT Signing key.

// Database models.
const User = rfr('/server/models/User');  // User database model.

/*
 *
 *
 *  Route definition.
 *
 *
 */
const login = (req, res, next) => {
  // Extract username and password from the request body.
  const username = req.body.username; // Username.
  const password = req.body.password; // Password.

  // Check if username/password are provided.
  if (!username || !password) {
    return next(MSG.ERROR.LOGIN.MISSING_CREDENTIALS);
  }

  // Access the database. Search for the user.
  User.findOne({ username: { $regex: new RegExp(username, 'i') } }, (err, result) => {
    // Database error check.
    if (err) {
      return next(MSG.ERROR.DB.DB_ERROR);
    }

    // If no user was found, return an error.
    if (!result) {
      return next(MSG.ERROR.LOGIN.NO_USER_FOUND);
    }

    // User was found, get salt and hashed password.
    const salt = result.password.salt;
    const storedHashedPassword = result.password.hash;

    // Generate a hashed password using the plaintext password, and the salt.
    const genHashedPassword = hashing.generateHashedPassword(password, salt).hash;

    /*
     * Compare the stored hash password with a generated one.
     *  If they do not match, return an error.
     */

    if (storedHashedPassword !== genHashedPassword) {
      return next(MSG.ERROR.LOGIN.INVALID_CREDENTIALS);
    }

    /*
     *  Create a JSON Web Token using the username, and secret signing key,
     *  which will expire in 24 hours.
     */
    const token = jwt.sign(
      { username: result.username },
      JWT_SIGNING_KEY,
      { expiresIn: 86400 });

    // Payload to be send back to user in the response.
    const payload = {
      username: result.username, // Username.
      token,                     // JSON Web token.
    };

    // Send success message with payload.
    return res.json(Object.assign({}, MSG.SUCCESS.LOGIN.LOGIN_SUCCESS, { payload }));
  });

  // Required to keep linter happy.
  return true;
};

// Export route.
module.exports = login;
