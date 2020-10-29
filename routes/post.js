const { Router } = require('express');
const postController = require('../controllers/post');
const validateJWT = require('../middlewares/validateJWT');

const post = Router();

post.route('/').post(validateJWT, postController.createPost);

module.exports = post;
