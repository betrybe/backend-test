const bodyParser = require('body-parser');
const express = require('express');
const rescue = require('express-rescue');

const models = require('./models');

const getUserController = require('./controllers/userController');
const getUserService = require('./services/userService');
const userRouter = require('./routers/userRouter');

const getPostController = require('./controllers/postController');
const getPostService = require('./services/postService');
const postRouter = require('./routers/postRouter');

const { errorHandler, validateLogin } = require('./middlewares/index');
const createToken = require('./helpers/createToken');

const factory = async () => {
  const app = express();
  app.use(bodyParser.json());

  const userService = getUserService(models, createToken);
  const userController = getUserController(userService);

  app.use('/user', userRouter(userController, models));

  const postService = getPostService(models);
  const postController = getPostController(postService);

  app.use('/post', postRouter(postController, models));

  app.post('/login', rescue(validateLogin), rescue(userController.login));

  app.get('/', (_request, response) => {
    response.send();
  });

  app.use(errorHandler);

  return app;
};

module.exports = {
  factory,
};
