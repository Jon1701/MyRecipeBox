// Module definition.
const auth = {
  TWITTER: {
    CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
    CALLBACK_URL: 'http://127.0.0.1:8080/api/auth/twitter/callback',
  },
  KEY: {
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
  },
};

// Module export.
module.exports = auth;
