const express = require('express');
const bodyParser = require('body-parser');

// const errorMiddleware = require('./middlewares/error');
const userController = require('./controllers/userController');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);

// app.use(errorMiddleware(config.environment));

module.exports = app;
