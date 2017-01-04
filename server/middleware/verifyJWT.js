// Dependencies.
const jwt = require('jsonwebtoken');  // JSON web token.
const rfr = require('rfr');           // Root relative paths.

// Other dependencies.
const JWT_SIGNING_KEY = rfr('/server/config/auth').KEY.JWT_SIGNING_KEY;  // JWT Signing key.

// Success/Error Response messages.
const MSG = (code) => {
  const messages = {
    MISSING_TOKEN: 'Token must be sent in the request header: x-access-token',
    INVALID_TOKEN: 'Token is invalid.',
  };

  // Return message as an Object.
  return {
    code,
    message: messages[code],
  };
};

// Middleware definition.
const verifyJWT = (req, res, next) => {
  // Access the token in the request header.
  const token = req.headers['x-access-token'];

  // If there is no token, return an error as response.
  if (!token) {
    return res.status(500).json(MSG('MISSING_TOKEN'));
  }

  // If a token was provided, decode it using the signing key.
  jwt.verify(token, JWT_SIGNING_KEY, (err, decoded) => {
    // If token is invalid, return error as response.
    if (err) {
      return res.status(500).json(MSG('INVALID_TOKEN'));
    }

    // Token is valid, store decoded token for future use.
    req.decoded = decoded;

    // Go to next middleware.
    return next();
  });

  // Keep linter happy.
  return true;
};

// Export middleware.
module.exports = verifyJWT;
