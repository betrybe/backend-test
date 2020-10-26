const express = require('express');
const bodyParser = require('body-parser');

const models = require('./models');
const { getUserService, getPostService } = require('./services');
const { getUserController, getPostController } = require('./controllers');

const {
  getValidateJWT,
  generateJWT,
  validateUserEntries,
  validateLoginEntries,
  validatePostEntries,
} = require('./middlewares');

const factory = async (config) => {
  const app = express();

  app.use(bodyParser.json());

  const userService = getUserService(models, generateJWT, config);
  const userController = getUserController(userService);
  const validateJWT = getValidateJWT(models, config);

  const postService = getPostService(models);
  const postController = getPostController(postService);

  app.get('/user', validateJWT, userController.getAllUsers);
  app.get('/user/:id', validateJWT, userController.getUserById);
  app.post('/user', validateUserEntries, userController.createUser);
  app.post('/login', validateLoginEntries, userController.userLogin);
  app.delete('/user/me', validateJWT, userController.deleteUser);

  app.get('/post', validateJWT, postController.getAllPosts);
  app.get('/post/search', validateJWT, postController.getPostBySearchTerm);
  app.get('/post/:id', validateJWT, postController.getPostById);
  app.post(
    '/post',
    validateJWT,
    validatePostEntries,
    postController.createPost,
  );
  app.put(
    '/post/:id',
    validateJWT,
    validatePostEntries,
    postController.updatePost,
  );
  app.delete('/post/:id', validateJWT, postController.deletePost);

  return app;
};

module.exports = { factory };
