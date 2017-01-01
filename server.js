// Dependencies.
const bodyParser = require('body-parser'); // Parse parameters from request body.
const express = require('express'); // ExpressJS.
const morgan = require('morgan');   // Log requests to console.
const path = require('path');       // Path module.
const rfr = require('rfr');         // Root relative paths.

// Express JS instance.
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

// use middleware which parses JSON.
app.use(bodyParser.json());

/*
 *
 *
 *  Routers.
 *
 *
 */

// Router: Base endpoint: /api.
const apiRoutes = express.Router();
app.use('/api', apiRoutes);

/*
 *
 *
 *  Unprotected routes.
 *  Base endpoint: /api
 *
 *
 */

// Search route.
apiRoutes.get('/test', rfr('server/routes/test'));

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

// Get next available port, or use 8080 if available.
const port = process.env.PORT || 8080;

// Listen for connections.
app.listen(port, () => {
  console.log(`Listening for connections on PORT ${port}`);
});
