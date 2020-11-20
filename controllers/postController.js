const { Router } = require('express');
const { Op } = require('sequelize');
const { Post, User } = require('../models');
const { verifyToken } = require('../middlewares');

const post = Router();

post.post('/', verifyToken,
  async (req, res, next) => {
    try {
      const { title, content } = req.body;
      if (!title) return res.status(400).json({ message: '"title" is required' });
      if (!content) return res.status(400).json({ message: '"content" is required' });
      const userID = await User.findOne({ where: { email: req.user.email } });
      const userid = userID.dataValues.id;
      console.log('id ESSE AQUI:', userid);
      const poster = await Post.create({
        userId: userid,
        title,
        content,
      });
      console.log('passei daqui', poster);
      return res.status(201).json(poster);
    } catch (err) {
      return next(err);
    }
  });

post.get('/', verifyToken,
  async (req, res, next) => {
    try {
      const posts = await Post.findAll({ include: 'user' });
      return res.status(200).json(posts);
    } catch (err) {
      return next(err);
    }
  });

post.get('/search', verifyToken,
  async (req, res, next) => {
    console.log('PARAAAAAAMS', req.query);
    try {
      const { q: searchTerm } = req.query;
      const mapper = await Post.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${searchTerm}%` } },
            { content: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
        include: 'user',
      });
      console.log('retorno do mapper:', mapper);
      return res.status(200).json(mapper || []);
    } catch(err) {
      return next(err);
    }
  });

post.get('/:id', verifyToken,
  async (req, res, next) => {
    try {
      const postbyId = await Post.findOne({ where: { id: req.params.id }, include: 'user' });
      if (!postbyId) return res.status(404).json({ message: 'Post não existe' });
      return res.status(200).json(postbyId);
    } catch (err) {
      return next(err);
    }
  });

post.delete('/:id', verifyToken,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userID = await User.findOne({ where: { email: req.user.email } });
      const postbyId = await Post.findOne({ where: { id }, include: 'user' });
      if (!postbyId) return res.status(404).json({ message: 'Post não existe' });
      if (userID.dataValues.id !== postbyId.dataValues.user.id) {
        return res.status(401).json({ message: 'Usuário não autorizado' });
      }
      await Post.destroy({ where: { id } });
      return res.status(204).json();
    } catch (err) {
      return next(err);
    }
  });

post.put('/:id', verifyToken,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userID = await User.findOne({ where: { email: req.user.email } });
      const postbyId = await Post.findOne({ where: { id }, include: 'user' });
      const idbuffer = postbyId.dataValues.user;
      if (!postbyId) return res.status(404).json({ message: 'Post não existe' });
      if (userID.dataValues.id !== idbuffer.id) {
        return res.status(401).json({ message: 'Usuário não autorizado' });
      }
      const { title, content } = req.body;
      if (!title) return res.status(400).json({ message: '"title" is required' });
      if (!content) return res.status(400).json({ message: '"content" is required' });
      await Post.update({ title, content }, { where: { id } });
      const buffer = idbuffer.id;
      return res.status(200).json({ title, content, userId: buffer });
    } catch (err) {
      return next(err);
    }
  });

module.exports = post;
