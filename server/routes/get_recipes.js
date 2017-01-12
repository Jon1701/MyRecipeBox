// Dependencies.
const rfr = require('rfr'); // Root-relative paths.
const isObjectIdValid = require('mongoose').Types.ObjectId.isValid;

// Database models.
const Recipe = rfr('/server/models/Recipe');  // Recipe database model.

// Success/Error Response messages.
const MSG = (code) => {
  const messages = {
    INVALID_PAGE_NUMBER: 'Page number must be an integer greater than or equal to 1.',
    INVALID_RECIPE_ID: 'Recipe ID is invalid',
    RECIPE_SEARCH_COMPLETE: 'Search results returned.',
    INVALID_PER_PAGE_NUMBER: 'Per Page number must be an integer between 1 and 20 inclusive.',
    DB_ERROR: 'Unknown database error occurred.',
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
const getRecipes = (req, res, next) => {
  /*
   *  Helper function to sanitize page number from the query string.
   *  Returns an integer number representation of the page number.
   *  If the page number is provided as a string, it just returns page number 1.
   */
  const sanitizePageNum = (pageNum) => {
    // Default page number.
    const DEFAULT_PAGE_NUM = 1;

    // If no page number was provided, return a 1.
    if (!pageNum) { return DEFAULT_PAGE_NUM; }

    // Convert pageNum into an integer.
    const intPageNum = parseInt(pageNum, 10);

    // Check if intPageNum is an integer.
    if (isNaN(intPageNum)) { return DEFAULT_PAGE_NUM; }

    // Return page number as an integer.
    return intPageNum;
  };

  /*
   *  Helper function to sanitize perPage from the query string.
   *
   *  If perPage is not provided, or is not a number, a default value is returned.
   *  If perPage can be cast as a number, but is not an integer, it is converted
   *  to an integer.
   */
  const sanitizePerPage = (perPage) => {
    // Default number of results per page.
    const NUM_RESULTS_PER_PAGE = 20;

    // If perPage was not provided, return default value of 20.
    if (!perPage) { return NUM_RESULTS_PER_PAGE; }

    // Convert perPage into an integer.
    const intPerPage = parseInt(perPage, 10);

    // Check if intPerPage is an integer, if not, return default value.
    if (isNaN(intPerPage)) { return NUM_RESULTS_PER_PAGE; }

    // If intPerPage is an integer, return it.
    return intPerPage;
  };

  /*
   *  Helper function to sanitize the sort_order parameter from the query string.
   *
   *  If no sort order is provided, -1 is returned. (Sort descending).
   *  If 'ascending' is provided, 1 is returned. (Sort ascending).
   */
  const sanitizeSortOrder = (sortOrder) => {
    // If the provided sortOrder is 'ascending', return 1.
    if (sortOrder === 'ascending') {
      return 1;
    }

    // Default sort order of 'descending'.
    return -1;
  };

  /*
   *  Helper function to sanitize the sort_by field in the query string.
   *
   *  If no field is provided, the date the recipe was created will be used.
   */
  const sanitizeSortBy = (sortBy) => {
    // By default, sort by date recipe was created.
    const DEFAULT_SORT_FIELD = 'creationDate';

    // Allowed fields to sort by.
    const ALLOWED_FIELDS = ['username', 'title', 'tagline', 'creationDate'];

    // If the given field is an allowed field, return that field name.
    if (ALLOWED_FIELDS.indexOf(sortBy) > -1) { return sortBy; }

    // If the given field to sort by is not an allowed field, return default field name.
    return DEFAULT_SORT_FIELD;
  };

  // Extract request parameters
  const recipeID = req.query.recipe_id; // Recipe ID.
  const username = req.query.username;  // Recipe author.
  const pageNum = sanitizePageNum(req.query.pageNum); // Page of results to return.
  const perPage = sanitizePerPage(req.query.perPage); // Number of results per page to return.
  const sortOrder = sanitizeSortOrder(req.query.sort_order);  // Sort order of results.
  const sortBy = sanitizeSortBy(req.query.sort_by);

  // Check for invalid page number.
  if (pageNum < 1) { return next(MSG('INVALID_PAGE_NUMBER')); }

  // Check for invalid per page.
  if (perPage < 1 || perPage > 20) { return next(MSG('INVALID_PER_PAGE_NUMBER')); }

  // Check if object id is invalid
  if (recipeID && !isObjectIdValid(recipeID)) {
    return next(MSG('INVALID_RECIPE_ID'));
  }

  // Blank search query.
  const searchQuery = {};

  // If recipeID is provided, add it to the search query.
  if (recipeID) { searchQuery['_id'] = recipeID; }

  // If username is provided, add it to the search query.
  if (username) { searchQuery.username = username; }

  // Find all matching recipes.
  Recipe
    .find(searchQuery, null)
    .limit(perPage)
    .skip((pageNum - 1) * perPage)
    .sort({ [sortBy]: sortOrder })
    .exec((errFind, resultsFind) => {
      // Database error handling.
      if (errFind) { return next(MSG('DB_ERROR')); }

      // Response payload.
      const payload = {
        recipes: resultsFind, // List of recipes.
      };

      // Return success response payload.
      return res.send(Object.assign({}, MSG('RECIPE_SEARCH_COMPLETE'), { payload }));
    });

  // Keep eslint happy.
  return true;
};

// Export route.
module.exports = getRecipes;
