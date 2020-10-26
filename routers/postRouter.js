const { Router } = require('express');
const rescue = require('express-rescue');
const { validateToken, validatePost } = require('../middlewares/index');

const post = Router();

const postRouter = (postController) => {
  post
    .post(
      '/',
      rescue(validateToken),
      rescue(validatePost),
      rescue(postController.createPost),
    )
    .get('/', rescue(validateToken), rescue(postController.getAllWithUser))
    .get('/:id', rescue(validateToken), rescue(postController.getById))
    .delete('/:id', rescue(validateToken), rescue(postController.deletePost));
  return post;
};
module.exports = postRouter;
