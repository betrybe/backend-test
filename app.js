const express = require('express');
const bodyParser = require('body-parser');

// const errorMiddleware = require('./middlewares/error');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const postController = require('./controllers/postController');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userController);
app.use('/login', loginController);
app.use('/post', postController);

// app.use(errorMiddleware(config.environment));

module.exports = app;
