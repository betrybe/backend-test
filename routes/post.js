const { Router } = require('express');
const { post: postController } = require('../controllers');
const { auth } = require('../middlewares');

const post = Router();

post.route('/search').get(auth, postController.searchPost);

post
  .route('/')
  .get(auth, postController.getAll)
  .post(auth, postController.createPost);

post
  .route('/:id')
  .get(auth, postController.getById)
  .put(auth, postController.updatePost)
  .delete(auth, postController.deletePost);

module.exports = post;
