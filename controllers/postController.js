const { Router } = require('express');
// const rescue = require('express-rescue');
const { validateJWT } = require('../middlewares/auth');
const { Posts } = require('../models');

const post = Router();

post.post('/', validateJWT, async (req, res) => {
  const { title, content } = req.body;
  const {
    dataValues: { id: userId },
  } = req.user;

  if (!title || !content) {
    return res.status(401).json({ message: `"${!title ? 'title' : 'content'}" is required` });
  }
  try {
    const createdPost = await Posts.create({ title, content, userId });
    return res.status(201).json(createdPost);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = post;
