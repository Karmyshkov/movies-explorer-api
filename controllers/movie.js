const Movie = require('../models/Movie');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((Movies) => res.status(200).send(Movies))
    .catch(next);
};

module.exports = {
  getMovies,
};