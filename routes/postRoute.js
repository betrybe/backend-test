const express = require('express');
const { postController } = require('../controllers');
const { authJWT } = require('../middlewares');

const router = express.Router();

router.post('/', authJWT, postController.createPost);
router.put('/:id', authJWT, postController.changePost);
router.delete('/:id', authJWT, postController.deletePost);
router.get('/', authJWT, postController.getAllPosts);
router.get('/search', authJWT, postController.searchPost);
router.get('/:id', authJWT, postController.getPostId);

module.exports = router;
