// Dependencies.
const rfr = require('rfr'); // Root-relative paths.
const isObjectIdValid = require('mongoose').Types.ObjectId.isValid; // Checks validity of ObjectID.
const mongoose = require('mongoose');

// Database models.
const Recipe = rfr('/server/models/Recipe');  // Recipe database model.

// Success/Error Response messages.
const MSG = (code) => {
  const messages = {
    MISSING_TITLE: 'Recipe title is required.',
    MISSING_TAGLINE: 'Recipe tagline is required.',
    MISSING_INGREDIENTS: 'Recipe ingredients are required.',
    MISSING_INSTRUCTIONS: 'Recipe preparation instructions are required.',
    MULTIPLE_INGREDIENTS_NEEDED: 'More than 1 ingredient is required.',
    MULTIPLE_PREPARATION_STEPS_NEEDED: 'More than 1 instruction step is required.',
    CREATE_RECIPE_SUCCESS: 'Recipe successfully created.',
    UPDATE_RECIPE_SUCCESS: 'Recipe successfully updated.',
    DB_ERROR: 'Unknown database error occurred.',
    INVALID_RECIPE_ID: 'Invalid Recipe ID',
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
const createRecipe = (req, res, next) => {
  // Get request body items.
  const username = req.decoded.username;  // String.
  const title = req.body.title;           // String.
  const tagline = req.body.tagline;       // String.
  const recipeID = req.body.recipe_id;    // ObjectID
  let ingredients = req.body.ingredients;   // Array of Strings.
  let instructions = req.body.instructions; // Array of Strings.

  // Error check: recipeID.
  if (recipeID && !isObjectIdValid(recipeID)) {
    // If recipe ID provided, but not a valid ObjectId, return error.
    return next(MSG('INVALID_RECIPE_ID'));
  }

  // Error check: title.
  if (!title || title.trim().length === 0) {
    return next(MSG('MISSING_TITLE'));
  }

  // Error check: tagline.
  if (!tagline || tagline.trim().length === 0) {
    return next(MSG('MISSING_TAGLINE'));
  }

  /*
   *  Helper function to iterate over an array, trim each item, and then only
   *  retain items which have non-zero length.
   */
  const filterOutEmptyStrings = arr => (
    arr.map(item => (item.trim())).filter(item => (item.length > 0))
  );

  // Error check: no ingredients.
  if (!ingredients) {
    return next(MSG('MISSING_INGREDIENTS'));
  }

  // Error check: no instructions.
  if (!instructions) {
    return next(MSG('MISSING_INSTRUCTIONS'));
  }

  // Error check: only one ingredient.
  if (typeof ingredients === 'string') {
    return next(MSG('MULTIPLE_INGREDIENTS_NEEDED'));
  }

  // Error check: only one instruction step.
  if (typeof instructions === 'string') {
    return next(MSG('MULTIPLE_PREPARATION_STEPS_NEEDED'));
  }

  // Filter out empty ingredients.
  ingredients = filterOutEmptyStrings(ingredients);

  // Filter out empty instructions.
  instructions = filterOutEmptyStrings(instructions);

  // Check if more than 1 ingredient is left over after filtering.
  if (ingredients.length < 2) {
    return next(MSG('MULTIPLE_INGREDIENTS_NEEDED'));
  }

  // Check if more than 1 instruction is left over after filtering.
  if (instructions.length < 2) {
    return next(MSG('MULTIPLE_PREPARATION_STEPS_NEEDED'));
  }

  // If a recipe ID was provided, user wants to edit an existing recipe.
  if (recipeID) {
    // Define query and setter.
    const query = { '_id': recipeID };
    const setter = { $set: { username, title, tagline, ingredients, instructions } };
    const options = { upsert: false, new: true };

    Recipe.findByIdAndUpdate(query, setter, options, (err, result) => {
      // Database error check.
      if (err) { return next(MSG('DB_ERROR')); }

      // Response payload.
      const payload = { recipe: result };

      // Send response to server.
      return res.json(Object.assign({}, MSG('UPDATE_RECIPE_SUCCESS'), { payload }));
    });
  } else {
    // Create a new recipe document.
    const newRecipe = Recipe({ username, title, tagline, ingredients, instructions });

    // Save the new recipe into the recipes collection.
    newRecipe.save((err, result) => {
      // Database error check.
      if (err) { return next(MSG('DB_ERROR')); }

      // Response payload: recipe.
      const payload = { recipe: result };

      // Send response to server.
      return res.json(Object.assign({}, MSG('CREATE_RECIPE_SUCCESS'), { payload }));
    });
  }

  // Return statement as required by eslint.
  return true;
};

// Export route.
module.exports = createRecipe;
