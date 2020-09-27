const rescue = require('express-rescue');
const { userValidation } = require('../services/joiValidation')
const { UserModel } = require('../models');
const error = require('../services/errorScheme');

const addUser = rescue(async (req, res) => {
  await userValidation.validateAsync(req.body)
    .then(() => {
      const { displayName, email, password, image } = req.body;
      UserModel.create({ displayName, email, password, image })
        .then((user) => res.status(200).json(user))
        .catch((e) => {
          console.log(e.message);
          res.status(500).send({ message: 'Algo deu errado' });
        });
    })
    .catch((err) => {
      throw error.GeneralError(err);
    });
});

module.exports = {
  addUser,
};
