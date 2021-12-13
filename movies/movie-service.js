const movieDao = require('./movie-dao');
const imdbApi = require('imdb-api');
const CONSTANTS = require('../consts.js');


const imdb = new imdbApi.Client({apiKey: CONSTANTS.IMDB_API_KEY});

module.exports = (app) => {
  const findMovies = (req, res) => {
      if (req.query.actor) {
        const actorName = req.query.actor;
        movieDao.findByActor(actorName)
        .then(movie => res.json(movie))
        .catch(err => console.log(err));
      } else {
        movieDao.findAllMovies()
        .then(movies => res.json(movies));
      }
  }

  const createMovie = (req, res) => {
    const movieName = req.query.movie;
    imdb.search({'name': movieName}).then((data) => {
      if (data) {
        let movie_item = data.results[0];
        imdb.get({'id': movie_item.imdbid})
        .then((detail) => {
          if (detail) {
            movie_item = {
              actors: detail.actors,
              ...movie_item,
            };
            movieDao.createMovie(movie_item)
            .then(movie_item => {
              res.json(movie_item);
            });
          }
        });
      }
    }).catch(err => console.log(err));
  }

  const deleteAll = (req, res) =>
      movieDao.deleteAllMovies()
          .then(res.json(200));

  const getMovieDetail = (req, res) => {
    const imdbId = req.query.imdbid;
    imdb.get({'id': imdbId}).then((data) => {
      if (data) {
        res.json(data);
      }
    }).catch(err => console.log(err));
  }

  const searchMovieByActor = (req, res) => {
    const actorName = req.query.actor;
    movieDao.findByActor(actorName)
    .then(movie => res.json(movie))
    .catch(err => console.log(err));
  }

  app.get('/api/movies', findMovies);
  app.post('/api/movies', createMovie);
  app.delete('/api/movies', deleteAll);
  app.get('/api/details', getMovieDetail);
};