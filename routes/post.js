const { Router } = require('express');
const postController = require('../controllers/post');
const validateJWT = require('../middlewares/validateJWT');

const post = Router();

post
  .route('/')
  .get(validateJWT, postController.getAll)
  .post(validateJWT, postController.createPost);

post.get('/:id', validateJWT, postController.getById);

module.exports = post;
