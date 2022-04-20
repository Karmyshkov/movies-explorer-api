require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  SUCCESS_SIGNIN,
  CONFLICT_EMAIL,
  BAD_REQUEST_AUTH,
  NOT_FOUND_USER,
  SUCCESS_SIGNOUT,
  BAD_REQUEST_USER,
  CONFLICT_CHANGE_EMAIL,
} = require('../utils/constants');

const { NODE_ENV, SECRET_KEY } = process.env;

const signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }, '+password').then((user) => {
    if (!user) {
      next(new UnauthorizedError());
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        next(new UnauthorizedError());
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
        .send({ message: SUCCESS_SIGNIN });
    })
    .catch(next);
};

const signup = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ConflictError(CONFLICT_EMAIL));
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
            next(new BadRequestError(BAD_REQUEST_AUTH));
          }
        });
    })
    .catch(next);
};

const signout = (req, res) => res
  .clearCookie('jwt', { httpOnly: true, sameSite: true })
  .send({ message: SUCCESS_SIGNOUT });

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      next(new BadRequestError(NOT_FOUND_USER));
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(NOT_FOUND_USER));
      } else {
        next(err);
      }
    });
};

const editProfile = (req, res, next) => {
  const id = req.user._id;
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    id,
    {
      email,
      name,
    },
    { new: true, runValidators: true },
  )
    .then((dataUser) => res.status(200).send({ data: dataUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_USER));
      } else if (err.name === 'CastError') {
        next(new BadRequestError(NOT_FOUND_USER));
      } else {
        next(err);
      }
    });
};

module.exports = {
  signin,
  signup,
  signout,
  getUserInfo,
  editProfile,
};
