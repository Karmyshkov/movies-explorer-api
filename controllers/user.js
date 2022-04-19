const bcrypt = require('bcrypt');
const User = require('../models/User');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');

const signin = (req, res, next) => {
  res.send('signin');
};

const signup = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(`Пользователь с ${email} существует`);
      }
    })
    .then(() => {
      bcrypt
        .hash(password, 10)
        .then((hash) => User.create({
          email,
          password: hash,
          name,
        }))
        .then((dataUser) => res.status(201).send({
          data: {
            name: dataUser.name,
            email: dataUser.email,
          },
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError(
              'Переданы некорректные данные при регистрации',
            );
          }
        });
    })
    .catch(next);
};

module.exports = {
  signin,
  signup,
};