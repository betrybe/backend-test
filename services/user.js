const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) =>
  User.create({ displayName, email, password, image });

module.exports = { createUser };
