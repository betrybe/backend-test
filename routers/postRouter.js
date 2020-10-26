const { Router } = require('express');
const rescue = require('express-rescue');
const { validateToken, validatePost } = require('../middlewares/index');

const post = Router();

const postRouter = (postController, models) => {
  post
    .post(
      '/',
      rescue(validateToken), rescue(validatePost(models)),
      rescue(postController.createPost),
    )
    .get('/',
      rescue(validateToken),
      rescue(postController.getAllWithUser))
    .get('/search',
      rescue(validateToken),
      rescue(postController.searchPost))
    .get('/:id',
      rescue(validateToken),
      rescue(postController.getById))
    .put('/:id',
      rescue(validateToken), rescue(validatePost(models)),
      rescue(postController.updatePost))
    .delete('/:id',
      rescue(validateToken), rescue(validatePost(models)),
      rescue(postController.deletePost));
  return post;
};
module.exports = postRouter;
