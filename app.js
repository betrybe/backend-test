const express = require('express');
const bodyParser = require('body-parser');

const models = require('./models');

const getUserController = require('./controllers/userController');
const getUserService = require('./services/userService');
const userRouter = require('./routers/userRouter');

const createToken = require('./helpers/createToken');
const errorHandler = require('./middlewares/errorHandler');

const factory = async () => {
  const app = express();
  app.use(bodyParser.json());

  const userService = getUserService(models, createToken);
  const userController = getUserController(userService);

  app.use('/user', userRouter(userController));

  app.get('/', (_request, response) => {
    response.send();
  });

  app.use(errorHandler);

  return app;
};

module.exports = {
  factory,
};
