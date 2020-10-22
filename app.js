const express = require('express');
const bodyParser = require('body-parser');

const models = require('./models');
const { getUserController } = require('./controllers/userController');
const { getUserService } = require('./services/userService');

const {
  getValidateJWT,
  generateJWT,
  validateEntries,
} = require('./middlewares');

const factory = async (config) => {
  const app = express();

  app.use(bodyParser.json());

  const userService = getUserService(models, generateJWT, config);
  const userController = getUserController(userService);
  const validateJWT = getValidateJWT(models, config);

  app.get('/user', validateJWT, userController.createUser);
  app.post('/user', validateEntries, userController.createUser);

  return app;
};

module.exports = { factory };
