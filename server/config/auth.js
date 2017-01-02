// Module definition.
const auth = {
  TWITTER: {
    CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
    CALLBACK_URL: process.env.TWITTER_CALLBACK_URL,
  },
  KEY: {
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
  },
};

// Module export.
module.exports = auth;
