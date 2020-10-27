const { Op } = require('sequelize');
const { Post, User } = require('../models');

const createPost = async ({ id, title, content }) =>
  Post.create({ userId: id, title, content });

const getAllPosts = async () => Post.findAll({});

const getPostById = async (id) => Post.findAll({ where: { id } });

const getAllPostsByQuery = async (q) =>
  Post.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
    where: {
      [Op.or]: [
        { content: { [Op.like]: `%${q}%` } },
        { title: { [Op.like]: `%${q}%` } },
      ],
    },
  });

const deletePost = async (id) => Post.destroy({ where: { id } }).then((result) => result);

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getAllPostsByQuery,
  deletePost,
};
