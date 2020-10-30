const express = require('express');
const { postController } = require('../controllers');
const { authJWT } = require('../middlewares');

const router = express.Router();

router.post('/', authJWT, postController.createPost);
router.put('/:id', authJWT, postController.updateOnePost);
router.delete('/:id', authJWT, postController.deleteOnePost);
router.get('/', authJWT, postController.getAllPosts);
router.get('/search', authJWT, postController.getPostsByQuery);
router.get('/:id', authJWT, postController.getPostById);

module.exports = router;
