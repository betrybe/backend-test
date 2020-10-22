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

postActions.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  Post.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }],
  })
    .then((result) => {
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(404).send({ message: 'Post não existe' });
    })
    .catch((e) => {
      console.log(e.message);
      return res.status(500).send({ message: 'Algo deu errado' });
    });
});

postActions.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  const { title, content } = req.body;
  // Verifica itens obrigatórios
  if (!title) {
    return res.status(400).send({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).send({ message: '"content" is required' });
  }

  // Recebe os dados do post e do usuário logado
  const post = await Post.findOne({ where: { id } });
  const user = await User.findOne({ where: { email } });
  if (!post) {
    return res.status(404).send({ message: 'Post não existe' });
  }
  if (!user) {
    return res.status(404).send({ message: 'Usuário não existe' });
  }

  // Salva os respectivos ids em constantes
  const postUserId = post.dataValues.userId;
  const loggedUserId = user.dataValues.id;

  // Se os ids forem diferentes
  if (postUserId !== loggedUserId) {
    return res.status(401).send({ message: 'Usuário não autorizado' });
  }

  // Se estiver tudo certo atualiza o post
  Post.update(
    { title, content },
    { where: { id } },
  )
    .then(() => res.status(200).send({ title, content, userId: loggedUserId }))
    .catch((e) => {
      console.log(e.message);
      return res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = {
  postActions,
};
