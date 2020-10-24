const express = require('express');
const bodyParser = require('body-parser');

const models = require('./models');
const { getUserController } = require('./controllers/userController');
const { getUserService } = require('./services/userService');

const {
  getValidateJWT,
  generateJWT,
  validateCreateUserEntries,
  validateUserLoginEntries,
} = require('./middlewares');

const factory = async (config) => {
  const app = express();

  app.use(bodyParser.json());

  const userService = getUserService(models, generateJWT, config);
  const userController = getUserController(userService);
  const validateJWT = getValidateJWT(models, config);

  app.get('/user', validateJWT, userController.getAllUsers);
  app.get('/user/:id', validateJWT, userController.getUserById);
  app.post('/user', validateCreateUserEntries, userController.createUser);
  app.post('/login', validateUserLoginEntries, userController.userLogin);

  return app;
};

module.exports = { factory };
