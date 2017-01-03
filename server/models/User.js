// Dependencies.
const mongoose = require('mongoose'); // MongoDB database driver.

// Mongoose Schema.
const Schema = mongoose.Schema;

// Schema definition.
const User = mongoose.model('User', new Schema({
  username: String,
  password: {
    hash: String,
    salt: String,
  },
}));

// Export schema.
module.exports = User;
