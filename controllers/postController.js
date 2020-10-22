const rescue = require('express-rescue');
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
  if (isPostValid) return res.status(isPostValid.code).json({message: isPostValid.message});
  Posts.update({ title, content }, { where: { id } })
    .then(() => res.status(200).json({ title, content, userId: uId }));
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};
