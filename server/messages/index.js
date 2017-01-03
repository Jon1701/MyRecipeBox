// Response object containing response status code, and error/success message.
const response = (code, message) => ({ code, message });

// Error messages.
const errors = {
  LOGIN: {
    NO_USER_FOUND: response('NO_USER_FOUND', 'No user found.'),
    MISSING_CREDENTIALS: response('MISSING_CREDENTIALS', 'Both a username and password are required.'),
    INVALID_CREDENTIALS: response('INVALID_CREDENTIALS', 'Incorrect username or password.'),
  },
  JWT: {
    MISSING_TOKEN: response('MISSING_TOKEN', 'Token must be sent in the request header: x-access-token'),
    INVALID_TOKEN: response('INVALID_TOKEN', 'Token is invalid.'),
  },
  SIGNUP: {
    MISSING_CREDENTIALS: response('MISSING_CREDENTIALS', 'Both a username and password are required.'),
    INVALID_USERNAME: response('INVALID_USERNAME', 'Invalid username. Valid characters are letters, numbers, and underscore. Must be between 8 and 25 characters long.'),
    INVALID_PASSWORD: response('INVALID_PASSWORD', 'Invalid password. Valid characters are letters, numbers, and underscore. Must be between 8 and 50 characters long.'),
    PASSWORD_MISMATCH: response('PASSWORD_MISMATCH', 'Passwords do not match.'),
    MISSING_PASSWORD_CONFIRMATION: response('MISSING_PASSWORD_CONFIRMATION', 'Both password and password confirmation are required.'),
    USER_EXISTS: response('USER_EXISTS', 'User already exists.'),
  },
  CREATE_RECIPE: {
    MISSING_TITLE: response('MISSING_TITLE', 'Recipe title is required.'),
    MISSING_TAGLINE: response('MISSING_TAGLINE', 'Recipe tagline is required.'),
    MISSING_INGREDIENTS: response('MISSING_INGREDIENTS', 'Recipe ingredients are required.'),
    MISSING_INSTRUCTIONS: response('MISSING_INSTRUCTIONS', 'Recipe preparation instructions are required.'),
    MULTIPLE_INGREDIENTS_NEEDED: response('MULTIPLE_INGREDIENTS_NEEDED', 'More than 1 ingredient is required.'),
    MULTIPLE_PREPARATION_STEPS_NEEDED: response('MULTIPLE_PREPARATION_STEPS_NEEDED', 'More than 1 instruction step is required.'),
  },
  DB: {
    DB_ERROR: response('DB_ERROR', 'Unknown database error occurred.'),
  },
  VIEW_RECIPE: {
    INVALID_PAGE_NUMBER: response('INVALID_PAGE_NUMBER', 'Page number must be an integer greater than or equal to 1.'),
    INVALID_RECIPE_ID: response('INVALID_RECIPE_ID', 'Recipe ID is invalid'),
  },
};

// Success messages.
const successes = {
  LOGIN: {
    LOGIN_SUCCESS: response('LOGIN_SUCCESS', 'Login successful.'),
  },
  SIGNUP: {
    USER_CREATED: response('USER_CREATED', 'User successfully created.'),
  },
  CREATE_RECIPE: {
    CREATE_RECIPE_SUCCESS: response('CREATE_RECIPE_SUCCESS', 'Recipe successfully created.'),
  },
  VIEW_RECIPE: {
    RECIPE_SEARCH_COMPLETE: response('RECIPE_SEARCH_COMPLETE', 'Search results returned.'),
  },
};

// Export error and success response objects.
module.exports = {
  ERROR: errors,
  SUCCESS: successes,
};
