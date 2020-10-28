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

  if (!post) return createError(404, 'Post não existe');

  return post;
};

const overwritePost = async (id, title, content, email) => {
  if (!title) return createError(400, '"title" is required');
  if (!content) return createError(400, '"content" is required');

  const post = await getPostById(id);
  if (post.dataValues.user.dataValues.email !== email) {
    return createError(401, 'Usuário não autorizado');
  }

  const answer = await Post.update({ title, content }, { where: { id } });

  return answer;
};

const deletePostById = async (id, email) => {
  const post = await getPostById(id);

  if (post.error) return post;
  if (post.dataValues.user.dataValues.email !== email) {
    return createError(401, 'Usuário não autorizado');
  }

  const answer = await Post.destroy({ where: { id } });

  return answer;
};

module.exports = {
  uploadPost,
  getAllPosts,
  getPostById,
  overwritePost,
  deletePostById,
};
