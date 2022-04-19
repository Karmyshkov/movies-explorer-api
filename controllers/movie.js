const Movie = require('../models/Movie');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((Movies) => res.status(200).send(Movies))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((dataCard) => res.status(201).send({ data: dataCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при добавлении фильма');
      } else if (err.code === 11000) {
        throw new ConflictError(err.message);
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  addMovie,
};
