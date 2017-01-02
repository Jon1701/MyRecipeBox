// Dependencies.
const mongoose = require('mongoose'); // MongoDB database driver.

// Mongoose Schema.
const Schema = mongoose.Schema;

// Schema definition.
const User = mongoose.model('User', new Schema({
  id: String,
  username: String,
  displayName: String,
}));

// Export schema.
module.exports = User;
