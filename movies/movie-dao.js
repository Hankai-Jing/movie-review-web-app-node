const movieModel = require('./movie-model');

const findAllMovies = () =>
    movieModel.find();

const createMovie = (movie) =>
    movieModel.create(movie);

const deleteAllMovies = () =>
    movieModel.deleteMany();

module.exports = {
  findAllMovies, createMovie, deleteAllMovies
}