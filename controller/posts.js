const jwt = require('jsonwebtoken');
const { Posts } = require('../models');
const { Users } = require('../models');
require('dotenv/config');
const { errors } = require('../services');

const createPost = async (req, res) => {
  const token = await req.headers.authorization;

  console.log(token);

  const SECRETE_KEY = process.env.SECRETE_KEY || 'l2UPGGeOuHP5cS1lhofe';

  const { title, content } = req.body;

  console.log(req.body);

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

module.exports = {
  createPost,
};
