const { Op } = require('sequelize');
const { Post, User } = require('../models');

const createPost = async (title, content, userId) => {
  await Post.create({ title, content, userId });

  return { title, content, userId };
};

const getAllPosts = async () => {
  const posts = await Post.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } }],
  });

  return posts;
};

const getPostById = async (id) => {
  const post = await Post.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } }],
  });

  if (!post) return { status: 404, message: 'Post não existe' };

  return post;
};

const updateOnePost = async (title, content, id, userId) => {
  const post = await Post.findOne({ where: { id } });

  if (post.userId !== userId) return { status: 401, message: 'Usuário não autorizado' };

  await Post.update({ title, content }, { where: { id } });

  const updatedPost = await Post.findOne({ where: { id } });

  return updatedPost;
};

const getPostsByQuery = async (query) => {
  const post = await Post.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } }],
  });

  return post;
};

const deleteOnePost = async (id, userId) => {
  const post = await Post.findOne({ where: { id } });

  if (post.userId !== userId) return { status: 401, message: 'Usuário não autorizado' };

  await Post.destroy({ where: { id } });

  const checkPost = await Post.findOne({ where: { id } });

  if (checkPost) return { status: 404, message: 'Post não deletado' };

  return { status: false };
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updateOnePost,
  getPostsByQuery,
  deleteOnePost,
};
