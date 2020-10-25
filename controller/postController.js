const { Op } = require('sequelize');
const { Users, Posts } = require('../models');
const { createPost, updtPost, findById } = require('../service/postService');

const insertPost = async (req, res) => {
  const userId = req.user.id;
  const response = await createPost({ ...req.body, userId });

  return response.dataValues
    ? res.status(201).json({ ...req.body, userId })
    : res.status(400).json(response.message);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const toBeUpdated = await findById(id);

  if (toBeUpdated.userId !== userId) { return res.status(401).json({ message: 'Usuário não autorizado' }); }

  const response = await updtPost({ ...req.body, id });

  return response.message
    ? res.status(400).json(response.message)
    : res.status(200).json({ ...req.body, userId });
};

const erasePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const toBeDeleted = await findById(id) || '';
    if (!toBeDeleted) res.status(404).json({ message: 'Post não existe' });
    if (toBeDeleted.userId !== userId) { return res.status(401).json({ message: 'Usuário não autorizado' }); }

    await toBeDeleted.destroy();
    return res.status(204).json();
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const listAll = async (_req, res) => {
  try {
    const postList = await Posts.findAll({
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
      attributes: { exclude: ['userId'] },
    });

    res.status(200).json(postList);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const listById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Posts.findOne({
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
      where: { id },
      // attributes: { exclude: ['userId'] }
    });

    return post
      ? res.status(200).json(post)
      : res.status(404).json({ message: 'Post não existe' });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const listByQuery = async (req, res) => {
  const { q } = req.query;

  try {
    const post = await Posts.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { content: { [Op.like]: `%${q}%` } },
        ],
      },
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
      attributes: { exclude: ['userId'] },
    });

    return res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = {
  insertPost,
  updatePost,
  erasePost,
  listAll,
  listById,
  listByQuery,
};
