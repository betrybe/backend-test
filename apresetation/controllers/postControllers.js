const { Router } = require('express');
const rescue = require('express-rescue');
const validateToken = require('../middleware/tokenValidation');
const {
  postDataEmpty,
} = require('../middleware/authUser');
const {
  getUserByEmail,
  createPost,
} = require('../../services');

const post = Router();

post.post(
  '/',
  postDataEmpty,
  validateToken,
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { email } = req.user;
    const user = await getUserByEmail(email);
    const { id } = user[0].dataValues;

    const createdPost = await createPost({ id, title, content });

    return res.status(201).json({
      title: createdPost.title,
      content: createdPost.content,
      userId: createdPost.userId,
    });
  }),
);

module.exports = post;
