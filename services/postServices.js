const { Post } = require('../models');

const registerPost = async (title, content, userId) => {
  if (!title) return { ok: false, status: 400, message: '"title" is required' };
  if (!content) return { ok: false, status: 400, message: '"content" is required' };
  const { dataValues: post } = await Post.create({ title, content, userId });
  return { ok: true, status: 201, post };
};

const getAllPosts = async () => Post.findAll({ include: 'user' });

module.exports = { getAllPosts, registerPost };
