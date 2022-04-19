const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const { signin, signup } = require('./controllers/user');

require('dotenv').config();

const { URI = 'mongodb://localhost:27017/mestodb', PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/signin', signin);
app.post('/signup', signup);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/movies'));

app.use(require('./middlewares/errorHandler'));

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT);