// Dependencies.
const jwt = require('jsonwebtoken');  // JSON Web Token.
const rfr = require('rfr'); // Root-relative paths.

// Other dependencies.
const hashing = rfr('/server/common/hashing');  // Hash and salt functions.

// Configuration files.
const JWT_SIGNING_KEY = rfr('/server/config/auth').KEY.JWT_SIGNING_KEY;  // JWT Signing key.

// Database models.
const User = rfr('/server/models/User');  // User database model.

// Success/Error Response messages.
const MSG = (code) => {
  const messages = {
    MISSING_CREDENTIALS: 'Username and password are required.',
    INVALID_CREDENTIALS: 'Incorrect username or password.',
    LOGIN_SUCCESS: 'Login successful.',
    DB_ERROR: 'Database error.',
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
const login = (req, res, next) => {
  // Extract username and password from the request body.
  const username = req.body.username; // Username.
  const password = req.body.password; // Password.

  // Check if username/password are provided.
  if (!username || !password) {
    return next(MSG('MISSING_CREDENTIALS'));
  }

  // Access the database. Search for the user.
  User.findOne({ username: { $regex: new RegExp(username, 'i') } }, (err, result) => {
    // Database error check.
    if (err) {
      return next(MSG('DB_ERROR'));
    }

    // If no user was found, return an error.
    if (!result) {
      return next(MSG('INVALID_CREDENTIALS'));
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
      return next(MSG('INVALID_CREDENTIALS'));
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
    return res.json(Object.assign({}, MSG('LOGIN_SUCCESS'), { payload }));
  });

  // Required to keep linter happy.
  return true;
};

// Export route.
module.exports = login;
