const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { Posts } = require('../models');
const { Users } = require('../models');
require('dotenv/config');
const { errors } = require('../services');

const createPost = async (req, res) => {
  const token = await req.headers.authorization;

  console.log(token);

  const SECRETE_KEY = process.env.SECRETE_KEY || 'l2UPGGeOuHP5cS1lhofe';

  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json(errors.titleRequired);
  }

  if (!content) {
    return res.status(400).json(errors.contentRequired);
  }
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    const teste = await jwt.verify(token, SECRETE_KEY);
    const user = await Users.findOne({ where: { email: teste.user.email } });
    const userId = user.id;
    const newPost = await Posts.create(
      {
        title,
        content,
        userId,
      },
    );
    return res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

const getAllPost = async (req, res) => {
  const token = await req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const SECRETE_KEY = process.env.SECRETE_KEY || 'l2UPGGeOuHP5cS1lhofe';

  const teste = await jwt.decode(token, SECRETE_KEY);

  if (!teste) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }

  try {
    const allPosts = await Posts
      .findAll({
        include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
        attributes: { exclude: ['userId'] },
      });

    return res.status(200).json(allPosts);
  } catch (err) {
    console.log(err);
  }
};

const getPostById = async (req, res) => {
  const token = await req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const SECRETE_KEY = process.env.SECRETE_KEY || 'l2UPGGeOuHP5cS1lhofe';

  const teste = await jwt.decode(token, SECRETE_KEY);

  if (!teste) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
  const { id } = req.params;
  const getPost = await Posts.findAll({
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
    where: { id },
  });

  if (getPost.length <= 0) {
    return res.status(404).json({ message: 'Post não existe' });
  }

  return res.status(200).json(getPost[0].dataValues);
};

const editPostById = async (req, res) => {
  const token = await req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const SECRETE_KEY = process.env.SECRETE_KEY || 'l2UPGGeOuHP5cS1lhofe';

  const teste = await jwt.decode(token, SECRETE_KEY);

  if (!teste) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

const searchByQuery = async (req, res) => {
  const token = await req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const SECRETE_KEY = process.env.SECRETE_KEY || 'l2UPGGeOuHP5cS1lhofe';

  const teste = await jwt.decode(token, SECRETE_KEY);

  if (!teste) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }

  const { q } = req.query;

  const getAllByQuery = await Posts.findAll({
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
    where: {
      [Op.or]: [
        { content: { [Op.like]: `%${q}%` } },
        { title: { [Op.like]: `%${q}%` } },
      ],
    },
  });

  return res.status(200).json(getAllByQuery);
};

const deletePost = async (req, res) => {
  const token = await req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const SECRETE_KEY = process.env.SECRETE_KEY || 'l2UPGGeOuHP5cS1lhofe';

  const teste = await jwt.decode(token, SECRETE_KEY);

  if (!teste) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }

  const user = await Users.findOne({ where: { email: teste.user.email } });

  const { id: userId } = user.dataValues;
  const { id } = req.params;

  const getPost = await Posts.findOne({ where: { id } });

  if (getPost === null) return res.status(404).json({ message: 'Post não existe' });

  if (getPost.dataValues.userId !== userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  await Posts.destroy({ where: { id } });

  return res.status(204).json();
};

module.exports = {
  createPost,
  getAllPost,
  getPostById,
  editPostById,
  searchByQuery,
  deletePost,
};
