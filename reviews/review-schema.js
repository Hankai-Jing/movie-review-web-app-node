const mongoose = require('mongoose');
const reviewSchema = mongoose.Schema({
  reviewerUsername: String,
  review: String,
  imdbid: String,
  movieName: String,
}, {collection: 'reviews'});
module.exports = reviewSchema;