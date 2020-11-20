const { Router } = require('express');
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

module.exports = post;
