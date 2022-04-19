const User = require('../models/User');

const signin = (req, res) => {
  res.send('signin');
};

const signup = (req, res) => {
  res.send('signup');
};

module.exports = {
  signin,
  signup,
};