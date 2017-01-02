/*
 *
 *
 *  Dependencies.
 *
 *
 */
const session = require('express-session'); // Session management for Express.
const bodyParser = require('body-parser'); // Parse parameters from request body.
const mongoose = require('mongoose'); // MongoDB database driver.
const passport = require('passport'); // Passport authentication.
const express = require('express'); // ExpressJS.
const morgan = require('morgan');   // Log requests to console.
const path = require('path');       // Path module.
const rfr = require('rfr');         // Root relative paths.

/*
 *
 *
 *  Other dependencies.
 *
 *
 */
const passportTwitter = rfr('/server/config/passportTwitter');  // Twitter Passport Strategy.
const DBCONFIG = rfr('/server/config/database');  // Database configuration.
const auth = rfr('/server/config/auth');  // Secret keys.

/*
 *
 *
 *  Database connection and logging.
 *
 *
 */

// Initial database connection.
mongoose.connect(DBCONFIG.CONNSTRING);

// Mongoose log if connected.
mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open: ${DBCONFIG.CONNSTRING_NO_CREDENTIALS}`);
});

// Mongoose log if an error occurred.
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

// Mongoose log if database is disconnected.
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

/*
 *
 *
 *  Express instance.
 *
 *
 */

const app = express();

/*
 *
 *
 *  Application Middleware.
 *
 *
 */

// Log requests to console.
app.use(morgan('dev'));

// Use middleware which parses urlencoded bodies.
app.use(bodyParser.urlencoded({ extended: false }));

// Use middleware which parses JSON.
app.use(bodyParser.json());

// Session middleware.
app.use(session({
  secret: auth.KEY.SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: true,
}));

// Initialize passport.
app.use(passport.initialize());

// Initialize session.
app.use(passport.session());

/*
 *
 *
 *  Routers.
 *
 *
 */

 // Router for: /api endpoints.
const apiRoutes = express.Router();
app.use('/api', apiRoutes);

// Router for: /api/auth endpoints.
const authRoutes = express.Router();
app.use('/api/auth', authRoutes);

/*
 *
 *
 *  Routes.
 *
 *
 */

// Twitter login.
authRoutes.get('/twitter', passportTwitter.authenticate('twitter'));

// Twitter login callback.
authRoutes.get('/twitter/callback', passportTwitter.authenticate('twitter', { failureRedirect: '/' }), (req, res, next) => {
  res.json(req.user);
});

/*
 *
 *
 *  Server-side rendering, and error routes.
 *
 *
 */

 // Error handling route.
 app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send(err);
 });

// Serve static files under the /dist folder.
app.use(express.static('dist'));

// Route to capture client-side routes and use the statically served files.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

/*
 *
 *
 *  Server
 *
 *
 */

// Get next available port.
const port = process.env.PORT;

// Listen for connections.
app.listen(port, () => {
  console.log(`Listening for connections on PORT ${port}`);
});
