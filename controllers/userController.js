const { Router } = require('express');
const { User } = require('../models');

const users = Router();

users.post('/', async (req, res) => {
  const { displayName, email = null, password, image } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }

  User.create({ displayName, email, password, image })
    .then((createdId) => res.status(201).json({
      id: createdId, displayName, email, password, image,
    }))
    .catch(({ errors }) => res.status(400).json({ message: errors[0].message }));
});

users.get('/', (_req, res) => {
  User.findAll()
    .then((results) => res.status(200).json(results))
    .catch(() => console.log('Nenhum usuario encontrado'));
});

module.exports = users;
