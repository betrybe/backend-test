const createUser = ({ Users }, generateJWT, config) => async (
  displayName,
  email,
  password,
  image,
) => {
  try {
    const user = await Users.create({ displayName, email, password, image });

    const { _password, ...data } = user;

    return generateJWT(data, config);
  } catch (err) {
    return err;
  }
};

const getUserService = (models, generateJWT, config) => ({
  createUser: createUser(models, generateJWT, config),
});

module.exports = { getUserService };
