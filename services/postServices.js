const { Post } = require('../models');

const registerPost = async (title, content, userId) => {
  if (!title) return { ok: false, status: 400, message: '"title" is required' };
  if (!content) return { ok: false, status: 400, message: '"content" is required' };
  const { dataValues: post } = await Post.create({ title, content, userId });
  return { ok: true, status: 201, post };
};

const getAllPosts = async () => Post.findAll({ include: 'user' });

const getPostById = async (id) => {
  const post = await Post.findByPk(id, { include: 'user' });
  if (!post) return { ok: false, status: 404, message: 'Post não existe' };
  return { ok: true, status: 200, post };
};

const updateMyPost = async (postId, userId, title, content) => {
  const validPost = await Post.findByPk(postId, { include: 'user' });
  if (validPost.user.id !== userId) return { ok: false, status: 401, message: 'Usuário não autorizado' };
  if (!title) return { ok: false, status: 400, message: '"title" is required' };
  if (!content) return { ok: false, status: 400, message: '"content" is required' };
  await Post.update({ title, content }, { where: { id: postId } });
  return { ok: true, status: 200, post: { title, content, userId } };
};

const deleteMyPost = async (postId, userId) => {
  const isValidPost = await Post.findByPk(postId);
  if (!isValidPost) return { ok: false, status: 404, message: 'Post não existe' };
  if (isValidPost.userId !== userId) {
    return { ok: false, status: 401, message: 'Usuário não autorizado' };
  }
  await Post.destroy({ where: { id: postId } });
  return { ok: true, status: 204 };
};

module.exports = {
  deleteMyPost,
  getAllPosts,
  getPostById,
  registerPost,
  updateMyPost,
};
