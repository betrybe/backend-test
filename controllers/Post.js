const { Post, User } = require('../models');

async function createPost(req, res) {
  const { user } = req;
  const { id, title, content, published, updated } = req.body;
  const post = await Post.create({ id, title, content, userId: user, published, updated });
  res.status(201).json(post);
}

async function getPosts(req, res) {
  const posts = await Post.findAll({ include: [{
    model: User, as: 'user',
  }] });
  return res.json(posts);
}
module.exports = { createPost, getPosts };
