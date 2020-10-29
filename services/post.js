const { Post } = require('../models');

const createPost = async ({ title, content }, id) =>
  Post.create({ userId: id, title, content });

const getAll = async () => Post.findAll({ include: 'user' });

// const deleteUser = async (id) => User.destroy({ where: { id } });

const getById = async (id) => {
  const post = await Post.findByPk(id, { include: 'user' });
  if (!post) return { message: 'Post não existe' };
  return post;
};

module.exports = { createPost, getAll, getById };
