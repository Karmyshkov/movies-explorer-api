const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

const checkValidURL = (value) => {
  if (!validator.isURL(value)) {
    throw new BadRequestError('Некорректный URL');
  }
  return value;
};

const movieIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
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
    owner: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  movieIdValidate,
  addMovieValidate,
};
