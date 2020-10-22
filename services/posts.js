const Joi = require('joi');
const { Op } = require('sequelize');

const { User, Post } = require('../models');

const getDataValues = (instance, toFilter = []) => {
  if (!instance) return null;
  return toFilter.reduce((intermediate, filter) => {
    const { [filter]: a, ...cleaned } = intermediate;
    return cleaned;
  }, instance.dataValues);
};

const validate = ({ title, content }) => Joi
  .object({ title: Joi.string().required(), content: Joi.string().required() })
  .validateAsync({ title, content })
  .catch((error, value) => ({ message: error.message, value }));

const createPost = async ({ title, content, userId }) => Post
  .create({ title, content, userId })
  .then(({ dataValues: { updated, published, id, ...post } }) => post);

const getAllPosts = async () => Post.findAll(
  { include: { model: User, as: 'user', attributes: { exclude: ['password'] } } },
)
  .then((res) => res && res.map(({ dataValues }) => dataValues));

const getUserFromPost = async (post) => post.getUser()
  .then(({ dataValues: { password, ...user } }) => user);

const getPostById = (id) => Post.findByPk(id)
  .then(async (post) => post && ({ ...getDataValues(post, ['userId']), user: await getUserFromPost(post) }))
  .then((post) => {
    if (!post) return { message: 'Post não existe' };
    const { userId, ...filteredPost } = post;
    return filteredPost;
  });

const updatePostById = (id, { title: t, content: c }) => Post
  .update({ title: t, content: c }, { where: { id } });

const deletePostById = async (id) => Post.destroy({ where: { id } });

const search = async (searchString) => {
  const toSearch = { [Op.substring]: searchString };
  const where = { [Op.or]: [{ title: toSearch }, { content: toSearch }] };
  const include = { model: User, as: 'user', attributes: { exclude: ['password'] } };
  return Post.findAll({ where, include });
};

module.exports = {
  validate,
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  search,
};
