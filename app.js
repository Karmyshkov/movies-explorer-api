const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { signin, signup, signout } = require('./controllers/user');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { signinValidate, signupValidate } = require('./middlewares/validation');

require('dotenv').config();

const { URI = 'mongodb://localhost:27017/mestodb', PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(requestLogger);

app.post('/signin', signinValidate, signin);
app.post('/signup', signupValidate, signup);
app.get('/signout', auth, signout);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/movies'));

app.use(auth, () => {
  throw new NotFoundError();
});

app.use(errorLogger);

app.use(errors());

app.use(require('./middlewares/errorHandler'));

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT);