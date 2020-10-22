const express = require('express');

const makeRouter = ({ postControllers }, middlewares) => {
  const postRouters = express.Router();
  postRouters.use(middlewares.auth());

  postRouters
    .post('/', postControllers.createPost)
    .get('/', postControllers.getAllPosts)
    .get('/search', postControllers.search)
    .get('/:id', postControllers.getPostById)
    .put('/:id', postControllers.userOwnerShip(), postControllers.updatePost)
    .delete('/:id', postControllers.userOwnerShip(), postControllers.deletePost);

  return postRouters;
};

module.exports = makeRouter;
