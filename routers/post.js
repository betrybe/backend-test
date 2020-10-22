const express = require('express');

const postRouters = express.Router();
const middlewares = require('../middlewares');

const { postControllers } = require('../controllers');

postRouters.use(middlewares.auth());

postRouters
  .get('/', postControllers.getAllPosts)
  .get('/search', postControllers.search)
  .get('/:id', postControllers.getPostById)
  .post('/', postControllers.createPost)
  .put('/:id', postControllers.userOwnerShip(), postControllers.updatePost)
  .delete('/:id', postControllers.userOwnerShip(), postControllers.deletePost);

module.exports = postRouters;
