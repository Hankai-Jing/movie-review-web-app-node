const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
  title: String,
  year: String,
  imdbid: String,
  type: String,
  poster: String,
  name: String,
}, {collection: 'movies'});
module.exports = movieSchema;