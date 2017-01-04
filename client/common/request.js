// Dependencies.
const axios = require('axios'); // Axios request library.

// Axios base config.
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// HTTP GET request wrapper.
const get = url => (
  axios.get(url, config)
);

// HTTP POST request wrapper.
const post = (url, body, token = null) => {
  // Store JSON web token in header if provided.
  if (token) {
    config.headers['x-access-token'] = token;
  }

  return axios.post(url, body, config);
};

// Export the GET and POST request functions.
module.exports = { get, post };
