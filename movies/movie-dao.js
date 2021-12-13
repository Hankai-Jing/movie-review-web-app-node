const movieModel = require('./movie-model');

const findAllMovies = () =>
    movieModel.find();

const createMovie = (movie) =>
    movieModel.create(movie);

const deleteAllMovies = () =>
    movieModel.deleteMany();

const findByActor = (actor) =>
    movieModel.find({"actors": {"$regex": `\\b${actor}\\b`, "$options": "i" } })

module.exports = {
  findAllMovies, createMovie, deleteAllMovies, findByActor
}