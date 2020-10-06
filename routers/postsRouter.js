const express = require('express');
const rescue = require('express-rescue');
const postsController = require('../controllers/postsController');
const { validateJWT } = require('../middlewares/auth');

const router = express.Router();

router.use(rescue(validateJWT));

router.get('/search', postsController.searchPosts);

router.post('/', postsController.createPost);

router.get('/', postsController.getPosts);

router.get('/:id', postsController.getPosts);

router.put('/:id', postsController.updatePost);

module.exports = router;
