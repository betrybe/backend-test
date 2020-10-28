const { Post, User } = require('../models');
const { createError } = require('../helpers/errorHelper');

const uploadPost = async (title, content, userId) => {
  if (!title) return createError(400, '"title" is required');
  if (!content) return createError(400, '"content" is required');
  const newPost = await Post.create({ title, content, userId });

  return newPost;
};

const getAllPosts = async () => {
  const allPosts = await Post.findAll({
    include: {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
  });

  return allPosts;
};

const getPostById = async (id) => {
  const post = await Post.findByPk(id, {
    include: {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
  });
  console.log(post);
  if (!post) return createError(404, 'Post não existe');

  return post;
};

module.exports = {
  uploadPost,
  getAllPosts,
  getPostById,
};
