// Module definition.
const auth = {
  KEY: {
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
    JWT_SIGNING_KEY: process.env.JWT_SIGNING_KEY,
  },
};

// Module export.
module.exports = auth;
