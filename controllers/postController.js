const rescue = require('express-rescue');
const postService = require('../services/postService');

const newPost = rescue(async (req, res) => {
  const { content, title } = req.body;

  const post = await postService.createPost(title, content, req.user.id);

  if (post.status) return res.status(post.status).json({ message: post.message });

  return res.status(201).json(post);
});

const test = async (req, res) => {
  const post = await postService.createPost('Teste', 'Mensagem de teste', 1);

  return res.status(201).json(post);
};

const postsList = rescue(async (_req, res) => {
  const posts = await postService.listPosts();

  return res.status(200).json(posts);
});

const getPost = rescue(async (req, res) => {
  const data = await postService.getPost(req.params.id);

  if (data.status) return res.status(data.status).json({ message: data.message });

  return res.status(200).json(data);
});

const updatePost = rescue(async (req, res) => {
  const { title, content } = req.body;

  const update = await postService.updatePost(title, content, req.params.id, req.user.id);

  if (update.status) return res.status(update.status).json({ message: update.message });

  return res.status(200).json(update);
});

module.exports = {
  newPost,
  test,
  postsList,
  getPost,
  updatePost,
};
