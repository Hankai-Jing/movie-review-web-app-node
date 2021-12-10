const reviewModel = require('./review-model');

const findAllReviews = () =>
    reviewModel.find();

const createReview = (review) =>
    reviewModel.create(review);

const findByUsername = ({reviewerUsername}) =>
    reviewModel.find({reviewerUsername});

const findByMovieId = (imdbid) =>
    reviewModel.find(imdbid);

const deleteReview = (reviewId) =>
    reviewModel.deleteOne({_id: reviewId});

module.exports = {
  findAllReviews, createReview, deleteReview, findByUsername, findByMovieId
}