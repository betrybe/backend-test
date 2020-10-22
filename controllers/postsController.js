const rescue = require('express-rescue');
const Sequelize = require('sequelize');
const CustomError = require('../services/errorScheme');
const { postValidation } = require('../services/joiValidation');
const { Posts } = require('../models');
const { Users } = require('../models');

const { Op } = Sequelize;

const createPost = rescue(async (req, res) => {
  const { body: { title, content }, user } = req;
  const { id: userId } = user;
  return postValidation.validateAsync({ title, content })
    .then(() => Posts.create({ title, content, userId })
      .then((data) => res.status(201).json(data.dataValues))
      .catch((err) => {
        throw new CustomError({ message: err.message, code: err.code });
      }))
    .catch((err) => {
      throw new CustomError({ message: err.message, code: 400 });
    });
});

const getPosts = rescue(async (req, res) => {
  const { id: postId } = req.params ? req.params : null;
  const attributes = { include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }] };
  const posts = await Posts
    .findAll(
      (postId
        ? { where: { id: postId }, ...attributes }
        : { ...attributes }
      ),
    )
    .then((data) => data)
    .catch((err) => {
      throw new CustomError({ message: err.message, code: 500 });
    });

  if (postId && posts.length === 0) throw new CustomError({ message: 'Post não existe', code: 404 });

  res.status(200).json(posts.length === 1
    ? posts[0]
    : posts);
});

const updatePost = rescue(async (req, res) => {
  const { body: { title, content }, user } = req;
  const { id: userId } = user;
  const { id: postId } = req.params;

  const getPost = () => Posts.findOne(
    { where: { id: postId } },
  )
    .then((data) => {
      if (!data) throw new CustomError({ message: 'Post não existe', code: 404 });
      return data.dataValues;
    })
    .catch((err) => {
      throw new CustomError({ message: err.message, code: err.code });
    });

  const postData = await getPost();

  if (Number(postData.userId) !== Number(userId)) throw new CustomError({ message: 'Usuário não autorizado', code: 401 });

  return postValidation.validateAsync({ title, content })
    .then(() => Posts.update(
      { title, content },
      { where: { id: postId } },
    )
      .then(async () => res.status(200).json(await getPost()))
      .catch((err) => {
        throw new CustomError({ message: err.message, code: err.code });
      }))
    .catch((err) => {
      throw new CustomError({ message: err.message, code: err.code || 400 });
    });
});

const searchPosts = rescue(async (req, res) => {
  const { query: { q } } = req;

  const posts = await Posts.findAll(
    {
      where: {
        [Op.or]: [
          { title: { [Op.like]: `${q}%` } },
          { content: { [Op.like]: `${q}%` } },
        ],
      },
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
    },
  ).then((data) => data.map(({ dataValues }) => dataValues))
    .catch((err) => {
      throw new CustomError({ message: err.message, code: err.code });
    });

  return res.status(200).json(posts);
});

const deletePosts = rescue(async (req, res) => {
  const { id: postId } = req.params ? req.params : null;
  if (!postId) throw new CustomError({ message: 'Nenhum ID foi especificado', code: 400 });

  const posts = await Posts
    .findAll({ where: { id: postId } }).then((data) => data)
    .catch((err) => {
      throw new CustomError({ message: err.message, code: 500 });
    });

  if (postId && posts.length === 0) throw new CustomError({ message: 'Post não existe', code: 404 });

  const { user: { id: userId } } = req;

  const { userId: currentAuthorId } = await Posts.findOne(
    { where: { id: postId } },
  ).then((data) => data.dataValues);

  if (Number(currentAuthorId) !== Number(userId)) throw new CustomError({ message: 'Usuário não autorizado', code: 401 });

  await Posts.destroy({ where: { id: postId } })
    .then(() => res.status(204).json({ message: 'Post deletado com sucesso' }))
    .catch((err) => {
      throw new CustomError({ message: err.message, code: err.code });
    });
});

module.exports = {
  createPost,
  getPosts,
  updatePost,
  searchPosts,
  deletePosts,
};
