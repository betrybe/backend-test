const createUser = (models, createToken) =>
  async (displayName, email, image, password) => {
    const user = await models.User.create(displayName, email, image, password);
    const token = createToken(displayName, email, user.id);
    return token;
  };

const userService = (models, createToken) => ({
  createUser: createUser(models, createToken),
});

module.exports = userService;
