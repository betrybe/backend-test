const rescue = require('express-rescue');
const sequelize = require('sequelize');
const { Users } = require('../models');
const { Posts } = require('../models');

const validatePost = (title, content) => {
  if (!title) {
    return { code: 400, message: '"title" is required' };
  }
  if (!content) {
    return { code: 400, message: '"content" is required' };
  }
};

const createPost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { user: { email } } = req;

  const isPostValid = validatePost(title, content);
  console.log('isPostValid', isPostValid);
  if (isPostValid) {
    return res.status(isPostValid.code)
      .json({ message: isPostValid.message });
  }

  // const { id } = (await Users.findAll({ where: { email }, raw: true }));
  const { id: userId } = (await Users.findAll({ where: { email } }))[0];
  // console.log('id', id[0].id);
  Posts.create({ title, content, userId, published: new Date(), updated: new Date() })
    .then(() => res.status(201).json({ title, content, userId }));
});

const getAllPosts = rescue(async (req, res) => {
  const allPosts = await Posts.findAll({ include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }] });
  console.log(allPosts);
  res.status(200).json(allPosts);
});

const getPostById = rescue(async (req, res) => {
  const getPostedById = (await Posts.findAll({ where: { id: req.params.id }, include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }] }))[0];

  if (!getPostedById) {
    res.status(404).json({ message: 'Post não existe' });
  }
  res.status(200).json(getPostedById);
});

const updatePost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const getPostedById = (await Posts.findAll({ where: { id }, include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }] }))[0];
  const { user: { id: userId } } = getPostedById;
  const { user: { email } } = req;
  const { id: uId } = (await Users.findAll({ where: { email } }))[0];
  if (userId !== uId) return res.status(401).json({ message: 'Usuário não autorizado' });
  const isPostValid = validatePost(title, content);
  if (isPostValid) return res.status(isPostValid.code).json({ message: isPostValid.message });
  Posts.update({ title, content }, { where: { id } })
    .then(() => res.status(200).json({ title, content, userId: uId }));
});

const searchTerm = rescue(async (req, res) => {
  const { Op } = sequelize;
  const { q } = req.query;
  const allPosts = await Posts.findAll({ include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }] });

  if (!q) return res.status(200).json(allPosts);

  const searchTermByTitle = (await Posts.findAll({ where: { title: { [Op.like]: `%${q}%` } }, include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }] }));

  const searchTermByContent = (await Posts.findAll({ where: { content: { [Op.like]: `%${q}%` } }, include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }] }));

  if (searchTermByTitle.length > 0) return res.status(200).json(searchTermByTitle);
  if (searchTermByContent.length > 0) return res.status(200).json(searchTermByContent);

  if (searchTermByTitle.length === 0 && searchTermByContent.length === 0) {
    return res.status(200).json([]);
  }
});

const deletePost = rescue(async (req, res) => {
  const { id } = req.params;
  const getPostedById = (await Posts.findAll({ where: { id }, include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }] }))[0];
  if (!getPostedById) return res.status(404).json({ message: 'Post não existe' });
  const { user: { id: userId } } = getPostedById;
  const { user: { email } } = req;
  const { id: uId } = (await Users.findAll({ where: { email } }))[0];
  if (userId !== uId) return res.status(401).json({ message: 'Usuário não autorizado' });
  Posts.destroy({ where: { id } }).then(() => res.status(204).end());
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  searchTerm,
  deletePost,
};
