const { Post } = require('../models');

async function createPost(req, res) {
  const { user } = req;
  console.log(user);
  const { id, title, content, published, updated } = req.body;
  const post = await Post.create({ id, title, content, userId: user, published, updated });
  res.status(201).json(post);
}
module.exports = { createPost };
