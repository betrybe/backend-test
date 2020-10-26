const sequelize = require('sequelize');
const { Post } = require('../models');

const createPost = async (postTitle, postContent, ownerId) =>
  Post.create({ title: postTitle, content: postContent, userId: ownerId })
    .then(({ title, content, userId }) =>
      ({ status: 201, response: { title, content, userId } }))
    .catch(({ errors }) => ({ status: 400, response: { message: errors[0].message } }));

const getAllPosts = async () => Post.findAll({ include: 'user' });

const getPostById = async (id) => {
  const post = await Post.findByPk(id, { include: 'user' });
  if (!post) return { status: 404, response: { message: 'Post não existe' } };
  return { status: 200, response: post };
};

const updatePostById = async (id, title, content, userId) => {
  const post = await Post.findByPk(id, { include: 'user' });
  if (!post) return { status: 404, response: { message: 'Post não encontrado' } };
  if (userId !== post.user.id) {
    return { status: 401, response: { message: 'Usuário não autorizado' } };
  }
  const updatedPost = await Post.update({ title, content }, { where: { id } });
  return updatedPost[0] === 1
    ? { status: 200, response: { title, content, userId } }
    : { status: 400, response: { message: 'error: Nenhum post editado' } };
};

const getPostBySearch = async (searchTerm) => {
  const { Op } = sequelize;
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

const detelePostById = async (id, userId) => {
  const post = await Post.findByPk(id, { include: 'user' });
  if (!post) return { status: 404, response: { message: 'Post não existe' } };
  if (post.user.id !== userId) return { status: 401, response: { message: 'Usuário não autorizado' } };
  if (post.user) { await Post.destroy({ where: { id } }); }
  return { status: 204 };
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  getPostBySearch,
  detelePostById,
};
