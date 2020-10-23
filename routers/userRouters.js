const router = require('express').Router();
const { User } = require('../models');
const createToken = require('../utils/createToken');
const validateToken = require('../utils/validateToken');

module.exports = (() => {
  router.post('/', async (req, res, next) => {
    try {
      const { displayName, email, password, image } = req.body;
      const createUser = await User.create({
        displayName,
        email,
        password,
        image,
      });
      if (createUser) {
        const { id } = createUser;
        const token = createToken({ id, email });
        return res.status(201).json({ token });
      }
    } catch (error) {
      next(error);
    }
  });
  router.get('/', validateToken, (req, res) => {
    User.findAll({ attributes: { exclude: ['password'] } })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((_e) => {
        res.status(401).json({ message: 'Token não encontrado' });
      });
  });
  router.get('/:id', validateToken, (req, res, _next) => {
    User.findByPk(req.params.id)
      .then((user) => {
        if (user === null) {
          return res.status(404).send({ message: 'Usuário não existe' });
        }
        return res.status(200).json(user);
      })
      .catch((_e) => res.status(500).json({ message: 'Algo deu errado' }));
  });
  router.delete('/me', validateToken, async (req, res) => {
    console.log(req.user);
    try {
      const { email } = req.user;
      await User.destroy({
        where: {
          email,
        },
      });
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({ message: 'Algo deu errado' });
    }
  });
  return router;
})();
