const createUser = ({ User }) => (displayName, email, password, image) => {
  return User.create({ displayName, email, password, image });
};

const getUserService = (models) => ({
  createUser: createUser(models),
});

module.exports = { getUserService };
