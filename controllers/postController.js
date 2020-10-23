const { Router } = require('express');
const { Op } = require('sequelize');
const { User } = require('../models');
const { Post } = require('../models');
const authMiddleware = require('../auth/authMiddleware');

const postActions = Router();

const userIsNotPostOwner = async (id, email) => {
  // Recebe os dados do post e do usuário logado
  const post = await Post.findOne({ where: { id } });
  const user = await User.findOne({ where: { email } });
  if (!post) {
    return { message: 'Post não existe' };
  }
  if (!user) {
    return { message: 'Usuário não existe' };
  }

  // Salva os respectivos ids em constantes
  const postUserId = post.dataValues.userId;
  const loggedUserId = user.dataValues.id;

  // Se os ids forem diferentes
  if (postUserId !== loggedUserId) {
    return { message: 'Usuário não autorizado' };
  }
  return { loggedUserId };
};

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

postActions.get('/search', authMiddleware, async (req, res) => {
  const { q } = req.query;
  Post.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `${q}%` } },
        { content: { [Op.like]: `${q}%` } },
      ],
    },
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

postActions.post('/', authMiddleware, async (req, res) => {
  const { email } = req.user;
  const { title, content } = req.body;
  // Verifica itens obrigatórios
  if (!title) {
    return res.status(400).send({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).send({ message: '"content" is required' });
  }

  // Recupera o id do usuário
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).send({ message: 'Usuário não existe' });
  }

  // Salva o id em uma constante
  const userId = user.dataValues.id;

  // Se estiver tudo certo publica o post
  const published = new Date();
  Post.create(
    { published, updated: published, title, content, userId },
  )
    .then(() => res.status(201).send({ title, content, userId }))
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

  // Verifica se o usuário não é autorizado a editar o post
  const notAuthToUpdate = await userIsNotPostOwner(id, email);
  if (notAuthToUpdate.message === 'Post não existe') {
    return res.status(404).send(notAuthToUpdate);
  }
  if (notAuthToUpdate.message === 'Usuário não existe') {
    return res.status(404).send(notAuthToUpdate);
  }
  if (notAuthToUpdate.message) {
    return res.status(401).send(notAuthToUpdate);
  }

  // Se estiver tudo certo atualiza o post
  const updated = new Date();
  Post.update(
    { updated, title, content },
    { where: { id } },
  )
    .then(() => res.status(200).send({ title, content, userId: notAuthToUpdate.loggedUserId }))
    .catch((e) => {
      console.log(e.message);
      return res.status(500).send({ message: 'Algo deu errado' });
    });
});

postActions.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  // Verifica se o usuário não é autorizado a deletar o post
  const notAuthToUpdate = await userIsNotPostOwner(id, email);
  if (notAuthToUpdate.message === 'Post não existe') {
    return res.status(404).send(notAuthToUpdate);
  }
  if (notAuthToUpdate.message === 'Usuário não existe') {
    return res.status(404).send(notAuthToUpdate);
  }
  if (notAuthToUpdate.message) {
    return res.status(401).send(notAuthToUpdate);
  }

  // Se estiver tudo certo deleta o post
  Post.destroy(
    { where: { id } },
  )
    .then(() => res.status(204).end())
    .catch((e) => {
      console.log(e.message);
      return res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = {
  postActions,
};
