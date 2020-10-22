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

const userLogin = ({ Users }, generateJWT, config) => async (email) => {
  const user = await Users.findAll({ where: { email }, raw: true });

  const userExists = user.length > 0;

  if (!userExists) {
    return { errors: { message: 'Campos inválidos' } };
  }

  const { _password, ...data } = user;

  return generateJWT(data, config);
};

const getUserService = (models, generateJWT, config) => ({
  createUser: createUser(models, generateJWT, config),
  userLogin: userLogin(models, generateJWT, config),
});

module.exports = { getUserService };
