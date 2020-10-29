const { Router } = require('express');
const postController = require('../controllers/post');
const validateJWT = require('../middlewares/validateJWT');

const post = Router();

post.route('/search').get(validateJWT, postController.searchPost);

post
  .route('/')
  .get(validateJWT, postController.getAll)
  .post(validateJWT, postController.createPost);

post
  .route('/:id')
  .get(validateJWT, postController.getById)
  .put(validateJWT, postController.updatePost);


module.exports = post;
