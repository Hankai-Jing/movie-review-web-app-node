const reviewDao = require('./review-dao');

module.exports = (app) => {
  const findAllReviews = (req, res) =>
      reviewDao.findAllReviews()
      .then(reviews => res.json(reviews));

  const findReviewsByUsers = (req, res) =>
      reviewDao.findByUsername({reviewerUsername: req.query.username})
      .then(reviews => res.json(reviews));

  const findReviewsByImdbId = (req, res) => {
    reviewDao.findByMovieId({imdbid: req.params.imdbid})
    .then(reviews => res.json(reviews))
    .catch(err => console.log(err));
  }


  const createReview = (req, res) => {
    reviewDao.createReview(req.body)
    .then(review => {
      res.json(review);
    })
  }

  const deleteReview = (req, res) =>
      reviewDao.deleteReview(req.params.reviewId)
          .then(status => res.send(status));

  app.get('/api/reviews/all', findAllReviews);
  app.get('/api/reviews', findReviewsByUsers);
  app.get('/api/reviews/:imdbid', findReviewsByImdbId);
  app.post('/api/reviews', createReview);
  app.delete('/api/reviews/:reviewId', deleteReview);
};