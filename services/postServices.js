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
  console.log(post);
  if (!post) return { ok: false, status: 404, message: 'Post não existe' };
  return { ok: true, status: 200, post };
};

module.exports = { getAllPosts, getPostById, registerPost };
