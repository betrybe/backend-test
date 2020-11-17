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

const updatePostById = async ({ title, content, id, idLoged }) => {
  const { userId } = await Post.findOne({ where: { id } });

  if (idLoged !== userId) return;

  await Post.update({ title, content }, { where: { id } });

  const editedPost = await Post.findOne({ where: { id } });

  return editedPost;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
};
