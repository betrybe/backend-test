const express = require('express');
const bodyParser = require('body-parser');

const models = require('./models');
const errorMiddleware = require('./middlewares/error');

const { getUserService } = require('./services/userService');
const { getUserController } = require('./controllers/userController');

const factory = async (config) => {
  const app = express();
  app.use(bodyParser.json());

  app.get('/ping', (_, res) => res.status(200).json({ message: 'ok' }));

  const userService = getUserService(models);
  const userController = getUserController(userService);

  app.post('/users', userController.createUser);

  app.use(errorMiddleware(config.enviroment));

  return app;
};

module.exports = { factory };
