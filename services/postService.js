const { Op } = require('sequelize');
const { Post, User } = require('../models');

const checkingRequiredFields = (title, content) => {
  if (!title) return { status: 400, message: '"title" is required' };
  if (!content) return { status: 400, message: '"content" is required' };
  return null;
};

const createPost = async (Title, Content, UserId) => {
  if (!Title) return { status: 400, message: '"title" is required' };
  if (!Content) return { status: 400, message: '"content" is required' };

  const post = await Post.create({ title: Title, content: Content, userId: UserId });

  const { title, content, userId } = post;

  return { title, content, userId };
};

const listPosts = async () => Post.findAll(
  { include: [{ model: User, as: 'user', attributes: { exclude: 'password' } }] },
);

const getPost = async (id) => {
  const post = await Post.findByPk(id,
    { include: [{ model: User, as: 'user', attributes: { exclude: 'password' } }] });

  if (!post) return { status: 404, message: 'Post não existe' };

  return post;
};

const updatePost = async (title, content, postId, userId) => {
  const check = checkingRequiredFields(title, content);
  if (check) return check;

  const post = await Post.findByPk(postId);

  if (post.userId !== userId) return { status: 401, message: 'Usuário não autorizado' };

  await Post.update({ title, content }, { where: { id: postId } });

  return { title, content, userId };
};

const searchPostByQuery = async (query) => {
  const post = await Post.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
    ],
  });
  return post;
};

const deletePost = async (id, userId) => {
  const post = await Post.findByPk(id);

  if (!post) return { status: 404, message: 'Post não existe' };
  if (userId !== post.userId) return { status: 401, message: 'Usuário não autorizado' };

  const data = await Post.destroy({ where: { id } });

  return data;
};

module.exports = {
  createPost,
  listPosts,
  getPost,
  updatePost,
  searchPostByQuery,
  deletePost,
};
