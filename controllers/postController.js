const express = require('express');
const rescue = require('express-rescue');
const { Post } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');
const { validatePostData } = require('../services/validatePost');

const router = express.Router();

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;

  const validation = await validatePostData(title, content);
  if (validation.error) {
    return res.status(validation.status).json({ message: validation.message });
  }

  const post = await Post.create({ title, content, userId });
  console.log('post: ', post);
  res.status(201).json(post);
};

router.post('/', authMiddleware, rescue(createPost));
// router.get('/', authMiddleware, rescue(getUsers));
// router.get('/:id', authMiddleware, rescue(getUserById));
// router.delete('/me', authMiddleware, rescue(deleteUser));

module.exports = router;
