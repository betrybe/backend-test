const Joi = require('joi');

const { User, Post } = require('../models');
const shapes = require('../utils/shapes');

const validate = ({ title, content }) => Joi
  .object({ title: shapes.title, content: shapes.content })
  .validateAsync({ title, content })
  .catch((error, value) => ({ message: error.message, value }));

const createPost = async ({ title, content, userId }) => Post
  .create({ title, content, userId })
  .then(({ dataValues: { updated, published, id, ...post } }) => post);

const getAllPosts = async () => Post.findAll(
  { include: { model: User, as: 'user', attributes: { exclude: ['password'] } } },
)
  .then((res) => res && res.map(({ dataValues }) => dataValues));

const getPostById = (id) => Post.findByPk(id)
  .then((res) => {
    if (res) {
      const { dataValues: { updated, published, id: i, ...post } } = res.dataValues;
      return post;
    }
    return { message: 'Post não existe' };
  });

const updatePostById = (id, { title, content }, userId) => Post.findByPk(id)
  .then((post) => {
    const user = post.getUser().then(({ password, ...creater }) => creater);
    const updatedPost = user.id === userId && post.update({ title, content });
    if (!updatedPost) return { message: 'Usuário não autorizado' };

    return { ...updatedPost.dataValues, user };
  });

const deletePostById = (id) => Post.destroy({ where: { id } });

module.exports = {
  validate,
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
