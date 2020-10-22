const express = require('express');
const rescue = require('express-rescue');
const postsController = require('../controllers/postsController');
const CustomError = require('../services/errorScheme');
const { validateJWT } = require('../middlewares/auth');

const router = express.Router();

router.use(rescue(validateJWT));

router.use((err, _req, _res, _next) => {
  throw new CustomError({ message: err.message, code: 401 });
});

router.get('/search', postsController.searchPosts);

router.post('/', postsController.createPost);

router.get('/', postsController.getPosts);

router.get('/:id', postsController.getPosts);

router.put('/:id', postsController.updatePost);

router.delete('/:id', postsController.deletePosts);

module.exports = router;
