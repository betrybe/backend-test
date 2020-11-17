const { Post, User } = require('../models');

const createPost = async ({ title, content, id: userId }) => Post
  .create({ title, content, userId });

const getAllPosts = async () => Post
  .findAll({
    include: { model: User, as: 'user' },
    attributes: { exclude: ['userId'] },
  }, { raw: true });

const getPostById = async (id) => Post
  .findByPk(id, {
    include: { model: User, as: 'user' },
    attributes: { exclude: ['userId'] },
  }, { raw: true });

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};
