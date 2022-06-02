const Movie = require('../models/Movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  BAD_REQUEST_MOVIE,
  NOT_FOUND_MOVIE,
  NO_RIGHTS,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((dataCard) => res.status(201).send({ data: dataCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MOVIE));
      } else {
        next(err);
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      next(new NotFoundError(NOT_FOUND_MOVIE));
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError(NO_RIGHTS));
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .orFail(() => {
          next(new NotFoundError(NOT_FOUND_MOVIE));
        })
        .then((dataMovie) => {
          if (dataMovie.owner.toString() !== req.user._id) {
            next(new ForbiddenError(NO_RIGHTS));
          }
          res.status(200).send(dataMovie);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(NOT_FOUND_MOVIE));
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
