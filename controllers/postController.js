const { Router } = require('express');
const { User } = require('../models');
const { Post } = require('../models');
const authMiddleware = require('../auth/authMiddleware');

const postActions = Router();

postActions.get('/', authMiddleware, async (req, res) => {
  Post.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }],
  })
    .then((result) => res.status(200).send(result))
    .catch((e) => {
      console.log(e.message);
      return res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = {
  postActions,
};
