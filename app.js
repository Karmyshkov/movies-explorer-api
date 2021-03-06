const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const rateLimiter = require('./middlewares/rateLimit');
const { ALLOWED_CORS } = require('./utils/constants');

require('dotenv').config();

const { URI = 'mongodb://localhost:27017/moviesdb', PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors(ALLOWED_CORS));

app.use(cookieParser());

app.use(requestLogger);

app.use(helmet());

app.use(rateLimiter);

app.use('/', routes);

app.use(errorLogger);

app.use(errors());

app.use(require('./middlewares/errorHandler'));

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT);
