// Dependencies.
const mongoose = require('mongoose'); // MongoDB database driver.

// Mongoose Schema.
const Schema = mongoose.Schema;

// Schema definition.
const Recipe = mongoose.model('Recipe', new Schema({
  username: String,
  title: String,
  tagline: String,
  ingredients: [String],
  instructions: [String],
}));

// Export schema.
module.exports = Recipe;
