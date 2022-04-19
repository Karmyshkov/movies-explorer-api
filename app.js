const express = require('express');
const { signin, signup } = require('./controllers/user');

const app = express();

app.post('/signin', signin);
app.post('/signup', signup);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/movies'));

app.listen(3000);