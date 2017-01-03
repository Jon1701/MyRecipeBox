// Dependencies.
const jwt = require('jsonwebtoken');  // JSON web token.
const rfr = require('rfr');           // Root relative paths.

// Other dependencies.
const MSG = rfr('/server/messages/index');// Response error/success messages.
const JWT_SIGNING_KEY = rfr('/server/config/auth').KEY.JWT_SIGNING_KEY;  // JWT Signing key.

// Middleware definition.
const verifyJWT = (req, res, next) => {
  // Access the token in the request header.
  const token = req.headers['x-access-token'];

  // If there is no token, return an error as response.
  if (!token) {
    return res.status(500).json(MSG.ERROR.JWT.MISSING_TOKEN);
  }

  // If a token was provided, decode it using the signing key.
  jwt.verify(token, JWT_SIGNING_KEY, (err, decoded) => {
    // If token is invalid, return error as response.
    if (err) {
      return res.status(500).json(MSG.ERROR.JWT.INVALID_TOKEN);
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
