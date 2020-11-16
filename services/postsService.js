const { Post } = require('../models');

const createPost = async (title, content, id) => {
  if (!title) return { error: { message: '"title" is required', statusCode: 400 } };
  if (!content) return { error: { message: '"content" is required', statusCode: 400 } };
  const post = await Post.create({ title, content, userId: id });
  return post;
};

const getAll = async () => {
  const posts = await Post.findAll({ include: 'user' });
  return posts;
};

const getById = async (id) => {
  const response = await Post.findOne({ where: { id }, include: 'user' });

  if (response === null) return { error: { message: 'Post não existe', statusCode: 404 } };

  return response;
};

const updateById = async (id, userId, data) => {
  const { title, content } = data;
  if (!title) return { error: { message: '"title" is required', statusCode: 400 } };
  if (!content) return { error: { message: '"content" is required', statusCode: 400 } };
  const post = await Post.findOne({ where: { id }, include: 'user' });
  if (post.userId !== userId) return { error: { message: 'Usuário não autorizado', statusCode: 401 } };
  await Post.update({ title, content }, { where: { id } });
  return { title, content, userId };
};

module.exports = {
  createPost,
  getAll,
  getById,
  updateById,
};
