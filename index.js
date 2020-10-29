const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./controllers/user');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', usersController);

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
