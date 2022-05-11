const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

const checkValidEmail = (value) => {
  if (!validator.isEmail(value)) {
    throw new BadRequestError('Некорректный email');
  }
  return value;
};

const checkValidURL = (value) => {
  if (!validator.isURL(value)) {
    throw new BadRequestError('Некорректный URL');
  }
  return value;
};

const movieIdValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).hex(),
  }),
});

const addMovieValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(checkValidURL).required(),
    trailerLink: Joi.string().custom(checkValidURL).required(),
    thumbnail: Joi.string().custom(checkValidURL).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const signinValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().custom(checkValidEmail).required(),
    password: Joi.string().required(),
  }),
});

const signupValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().custom(checkValidEmail).required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports = {
  movieIdValidate,
  addMovieValidate,
  signinValidate,
  signupValidate,
};
