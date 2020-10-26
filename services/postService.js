const { Post } = require('../models');

const createPost = async ({ id, title, content }) =>
  Post.create({ userId: id, title, content });

module.exports = {
  createPost,
};
