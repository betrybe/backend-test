const createUser = ({ User }) => (displayName, email, password, image) => {
  User.create({ displayName, email, password, image });
};

const getUserService = (models) => ({
  createUser: createUser(models),
});

module.exports = { getUserService };
