const { Post } = require('../models');

const createPost = async ({ title, content, id: userId }) => await Post
  .create({ title, content, userId });

module.exports = {
  createPost,
};
