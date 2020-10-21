const app = require('express');
const { Users } = require('../models/User');

const user = app.Router();

user.post('/', (req, res) => {
  const { displayName, email, password, image } = req.body;
  Users.create(displayName, email, password, image)
    .then((createdUser) => {
      res.status(200).json(createdUser);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = user;
