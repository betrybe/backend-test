const express = require('express');

const errorMiddleware = require('./apresentation/middlewares/error');
const userController = require('./apresentation/controllers/userController');

async function factory() {
  const app = express();
  app.get('/', (_request, response) => response.send());
  app.use('/', userController);

  app.use(errorMiddleware);
  return app;
}

module.exports = {
  factory,
};
