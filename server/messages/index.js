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
};

// Success messages.
const successes = {
  LOGIN: {
    LOGIN_SUCCESS: response('LOGIN_SUCCESS', 'Login successful.'),
  },
};

// Export error and success response objects.
module.exports = {
  ERROR: errors,
  SUCCESS: successes,
};
