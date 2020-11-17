const { Router } = require('express');
const rescue = require('express-rescue');

const { postController } = require('../controllers');
const { postValidation, authMiddleware } = require('../middlewares');

const post = Router();

post.get('/', authMiddleware(), rescue(postController.getAllPosts));

post.get('/:id', authMiddleware(), rescue(postController.getPostById));

post.post('/', authMiddleware(), postValidation, rescue(postController.createPost));

module.exports = post;
