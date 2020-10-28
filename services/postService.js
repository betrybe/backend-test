const { Post } = require('../models');
const { createError } = require('../helpers/errorHelper');

const uploadPost = async (title, content, userId) => {
  if (!title) return createError(400, '"title" is required');
  if (!content) return createError(400, '"content" is required');
  const newPost = await Post.create({ title, content, userId });

  return newPost;
};

module.exports = {
  uploadPost,
};
