const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./apresentation/middlewares/error');
const Auth = require('./apresentation/middlewares/auth');

const models = require('./models');

const { getUserService } = require('./service/userService');
const { getUserController } = require('./apresentation/controllers/userController');

const { getPostControllers } = require('./apresentation/controllers/postController');
const { getPostService } = require('./service/postService');

// const postModel = require('./models/Posts');

const postService = getPostService(models);
const postController = getPostControllers(postService);

const userService = getUserService(models);
const userController = getUserController(userService);

async function factory() {
  const app = express();

  app.use(bodyParser.json());
  app.get('/', (_request, response) => response.send());

  app.post('/user', userController.createUser);
  app.post('/login', Auth, userController.loginUser);
  app.get('/user', Auth, userController.getUsers);
  app.get('/user/:id', userController.getUserById);
  app.delete('user/me', userController.deleteUser);

  app.post('/post', Auth, postController.createPosts);
  app.get('/post', postController.getPosts);
  app.get('/post/:id', postController.getPostsById);
  app.put('/post/:id', postController.putPosts);
  app.get('/post/search?');
  app.delete('/post/:id', postController.deletePost);

  app.use(errorMiddleware);
  return app;
}

module.exports = {
  factory,
};
