const express = require('express');
const rescue = require('express-rescue');
const postsController = require('../controllers/postsController');
const { validateJWT } = require('../middlewares/auth');

const router = express.Router();

router.use(rescue(validateJWT));

router.post('/', postsController.createPost);

module.exports = router;
