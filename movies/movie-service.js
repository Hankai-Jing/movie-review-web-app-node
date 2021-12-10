const movieDao = require('./movie-dao');
const imdbApi = require('imdb-api');
const CONSTANTS = require('../consts.js');


const imdb = new imdbApi.Client({apiKey: CONSTANTS.IMDB_API_KEY});

module.exports = (app) => {
  const findAllMovies = (req, res) =>
      movieDao.findAllMovies()
      .then(movies => res.json(movies));

  const createMovie = (req, res) => {
    const movieName = req.query.movie;
    imdb.search({'name': movieName}).then((data) => {
      if (data) {
        const movie_item = data.results[0];
        movieDao.createMovie(movie_item)
        .then(movie_item => {
          res.json(movie_item);
        })
      }
    }).catch(err => console.log(err));
  }

  const deleteAll = (req, res) =>
      movieDao.deleteAllMovies()
          .then(res.json(200));

  app.get('/api/movies', findAllMovies);
  app.post('/api/movies', createMovie);
  app.delete('/api/movies', deleteAll);
};