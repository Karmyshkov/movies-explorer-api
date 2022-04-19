require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, SECRET_KEY } = process.env;

const signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }, '+password').then((user) => {
    if (!user) {
      throw new UnauthorizedError();
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new UnauthorizedError();
      }
      return user;
    });
  })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRET_KEY : 'SECRET_KEY_TEST',
        {
          expiresIn: '7d',
        },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .status(200)
        .send({ message: 'Успешная авторизация' });
    })
    .catch(next);
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