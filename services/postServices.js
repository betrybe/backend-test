const { Post, User } = require('../models');

const createPost = async ({ title, content, id: userId }) => await Post
  .create({ title, content, userId });

const getAllPosts = async () => await Post
  .findAll({
    include: { model: User, as: 'user' },
    attributes: { exclude: ['userId'] },
  }, { raw: true });

module.exports = {
  createPost,
  getAllPosts,
};
