const boom = require('@hapi/boom');

const { userServices } = require('../services');

const userCreation = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const user = await userServices.userCreation({ displayName, email, password, image });

  if (!user) {
    return next(boom.conflict('Usuário já existe'));
  }

  res.status(201).json(user);
};

module.exports = {
  userCreation,
};
