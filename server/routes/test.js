/*
 *
 *
 *  Route definition.
 *
 *
 */
const test = (req, res, next) => {
  return res.send('Successfully accessed the /api/test route.');
};

// Export route.
module.exports = test;
