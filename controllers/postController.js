const rescue = require('express-rescue');
const { uploadPost, getAllPosts, getPostById, overwritePost } = require('../services/postService');

const createPost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user[0];

  const response = await uploadPost(title, content, id);

  if (response.error) {
    return res.status(response.error.status).json({ message: response.error.message });
  }

  return res.status(201).json({
    title: response.title,
    content: response.content,
    userId: response.userId,
  });
});

const listAllPosts = rescue(async (_req, res) => {
  const response = await getAllPosts();

  return res.status(200).json(response);
});

const listPostById = rescue(async (req, res) => {
  const { id } = req.params;
  const response = await getPostById(id);

  if (response.error) {
    return res.status(response.error.status).json({ message: response.error.message });
  }

  return res.status(200).json(response);
});

const updatePost = rescue(async (req, res) => {
  const { id } = req.params;
  const { email } = req.user[0];
  const { title, content } = req.body;

  const response = await overwritePost(id, title, content, email);

  if (response.error) {
    return res.status(response.error.status).json({ message: response.error.message });
  }

  const post = await getPostById(id);

  return res.status(200).json({
    title: post.title,
    content: post.content,
    userId: post.userId,
  });
});

module.exports = {
  createPost,
  listAllPosts,
  listPostById,
  updatePost,
};
