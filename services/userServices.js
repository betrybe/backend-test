const { User } = require('../models');

const userCreation = async ({ displayName, email, password, image }) => {
  const userExist = await User.findAll({ where: { email } });

  if (userExist.length > 0) return;

  const userCreated = await User.create({ displayName, email, password, image });

  return userCreated;
};

module.exports = {
  userCreation,
};
