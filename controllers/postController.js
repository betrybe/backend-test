const rescue = require('express-rescue');
const { uploadPost } = require('../services/postService');

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

module.exports = {
  createPost,
};
