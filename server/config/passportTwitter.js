// Dependencies.
const TwitterStrategy = require('passport-twitter'); // Twitter Passport Strategy.
const passport = require('passport'); // Passport.
const rfr = require('rfr'); // Root-relative paths.

// Models.
const User = rfr('/server/models/User');

// Twitter API keys.
const auth = rfr('/server/config/auth');

// Configure the Twitter Strategy.
passport.use(new TwitterStrategy({
  consumerKey: auth.TWITTER.CONSUMER_KEY,
  consumerSecret: auth.TWITTER.CONSUMER_SECRET,
  callbackURL: auth.TWITTER.CALLBACK_URL,
}, (token, tokenSecret, profile, done) => {
  // Search query to find by user ID.
  const query = { id: profile.id };

  // Make code asynchronous.
  process.nextTick(() => {
    // Search the database for a the given User.
    User.findOne(query, (errFind, resultFind) => {
      // Error check.
      if (errFind) { return done(errFind); }

      // If a user was found, log them in.
      if (resultFind) { return done(null, resultFind); }

      // No user found, create a new user.
      const newUser = new User();
      newUser.id = profile.id;
      newUser.displayName = profile.displayName;
      newUser.username = profile.username;

      // Save new user into the database.
      newUser.save((errSave) => {
        // Error check.
        if (errSave) { throw errSave; }

        // Return new user.
        return done(null, newUser);
      });

      // Keep eslint happy.
      return true;
    });
  });
}));

// Serialize the user for the session.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user from the session.
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Export the passport.
module.exports = passport;
