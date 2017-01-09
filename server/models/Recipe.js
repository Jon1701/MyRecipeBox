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
  creationDate: { type: Date, default: Date.now },
}));

// Export schema.
module.exports = Recipe;
