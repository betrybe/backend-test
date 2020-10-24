const { Router } = require('express');
const rescue = require('express-rescue');
const { validateToken, validatePost } = require('../middlewares/index');

const post = Router();

const postRouter = (postController) => {
  post.post(
    '/',
    rescue(validateToken),
    rescue(validatePost),
    rescue(postController.createPost),
  );
  post.get('/', rescue(validateToken), rescue(postController.getAllWithUser));
/*  user.get('/:id', rescue(validateToken), rescue(postController.getById));
  user.delete('/me', rescue(validateToken), rescue(postController.deletePost)); */
  return post;
};
module.exports = postRouter;
