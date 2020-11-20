const { Op } = require('sequelize');
const { Post } = require('../models');

const createPost = async ({ title, content }, id) => {
  if (!title) return { errors: [{ message: '"title" is required' }] };
  if (!content) return { errors: [{ message: '"content" is required' }] };
  return Post.create({ userId: id, title, content });
};

const deletePost = async (id, userId) => {
  const post = await Post.findByPk(id, { include: 'user' });
  if (!post) return { message: 'Post não existe', code: 404 };
  if (post.user.id !== userId) return { message: 'Usuário não autorizado', code: 401 };
  await Post.destroy({ where: { id } });
};

const getAllPosts = async () => Post.findAll({ include: 'user' });

const getPostById = async (id) => {
  const post = await Post.findByPk(id, { include: 'user' });
  if (!post) return { message: 'Post não existe' };
  return post;
};

const updatePost = async ({ title, content }, id, userId) => {
  if (!title) return { message: '"title" is required' };
  if (!content) return { message: '"content" is required' };
  const post = await Post.findByPk(id, { include: 'user' });
  if (!post) return { message: 'Post não existe' };
  if (userId !== post.user.id) {
    return { message: 'Usuário não autorizado', code: 401 };
  }
  await Post.update({ title, content }, { where: { id } });
  return { title, content, userId };
};

const searchPost = async (searchTerm) => {
  const posts = await Post.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { content: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
    include: 'user',
  });
  return { status: 200, response: posts || [] };
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  searchPost,
  deletePost,
};
