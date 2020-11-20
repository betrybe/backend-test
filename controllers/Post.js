const { Post, User } = require('../models');

async function createPost(req, res) {
  const { user } = req;
  const { id, title, content, published, updated } = req.body;
  const post = await Post.create({
    id,
    title,
    content,
    userId: user,
    published,
    updated,
  });
  res.status(201).json(post);
}

async function getPosts(req, res) {
  const posts = await Post.findAll({
    include: [
      {
        model: User,
        as: 'user',
      },
    ],
  });
  return res.json(posts);
}

async function getPostsById(req, res) {
  const { id } = req.params;
  const posts = await Post.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: 'user',
      },
    ],
  });
  if (!posts) {
    return res.status(404).json({ message: 'Post não existe' });
  }
  return res.json(posts);
}

async function updatePost(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  await Post.update({ title, content }, { where: { id } });
  const updated = await Post.findOne({ where: { id } });
  res.json(updated);
}
module.exports = { createPost, getPosts, getPostsById, updatePost };
