const { Router } = require('express');
const models = require('../models');

const post = Router();

const { blogPostService } = require('../services/blogPostService');
const { blogPostController } = require('../controllers/blogPostController');

const postService = blogPostService(models);
const postController = blogPostController(postService);

post.post('/', postController.createPost);
post.get('/', postController.getPost);

module.exports = post;
