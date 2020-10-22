const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./apresentation/middlewares/error');
const authentication = require('./apresentation/middlewares/auth');

const models = require('./models');

const { getUserService } = require('./service/userService');
const { getUserController } = require('./apresentation/controllers/userController');

const userService = getUserService(models);
const userController = getUserController(userService);

async function factory() {
  const app = express();

  app.use(bodyParser.json());
  app.get('/', (_request, response) => response.send());

  app.post('/user', userController.createUser);
  app.post('/login', authentication, userController.loginUser);
  app.get('/user', userController.getUsers);
  app.get('/user/:id', userController.getUserById);
  app.delete('user/me', userController.deleteUser);

  app.use(errorMiddleware);
  return app;
}

module.exports = {
  factory,
};
