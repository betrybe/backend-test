const express = require('express');

const postRouters = express.Router();
const middlewares = require('../middlewares');

const { postControllers } = require('../controllers');

postRouters.use(middlewares.auth());

postRouters
  .post('/', postControllers.createPost)
  .get('/', postControllers.getAllPosts)
  .get('/:id', postControllers.getPostById)
  .put('/:id', postControllers.updatePost);

module.exports = postRouters;
