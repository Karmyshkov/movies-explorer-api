require("dotenv").config();
const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? SECRET_KEY : "SECRET_KEY_TEST"
    );
  } catch (err) {
    next(new UnauthorizedError("Необходима авторизация"));
  }
  req.user = payload;
  next();
};
