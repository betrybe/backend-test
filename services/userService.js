const createUser = ({ User }) => (displayName, email, password, image) => {
  const user = User.create({ displayName, email, password, image });

  console.log(user);

  return user;
};

const getUserService = (models) => ({
  createUser: createUser(models),
});

module.exports = { getUserService };
