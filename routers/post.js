const express = require('express');

const postRouters = express.Router();
const middlewares = require('../middlewares');

const { postControllers } = require('../controllers');

postRouters.use(middlewares.auth());

postRouters
  .post('/', postControllers.createPost)
  .get('/', postControllers.getAllPosts)
  // .get('/search', postControllers.search)
  .get('/:id', postControllers.getPostById)
  .put('/:id', postControllers.userOwnerShip(), postControllers.updatePost)
  .delete('/:id', postControllers.userOwnerShip(), postControllers.deletePost);

module.exports = postRouters;
