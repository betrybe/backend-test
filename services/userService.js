const createUser = ({ Users }, generateJWT, config) => async (
  displayName,
  email,
  password,
  image,
) => {
  try {
    const user = await Users.create({ displayName, email, password, image });

    const { _password, ...data } = user.dataValues;

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

  const { _password, ...data } = user[0];

  return generateJWT(data, config);
};

const getAllUsers = ({ Users }) => async () => Users.findAll({ raw: true });

const getUserById = ({ Users }) => async (id) => {
  const user = await Users.findByPk(id, { raw: true });

  if (!user) {
    return { errors: { message: 'Usuário não existe' } };
  }

  return user;
};

const deleteUser = ({ Users }) => async (id) => Users.destroy({ where: { id } });

const getUserService = (models, generateJWT, config) => ({
  createUser: createUser(models, generateJWT, config),
  userLogin: userLogin(models, generateJWT, config),
  getAllUsers: getAllUsers(models),
  getUserById: getUserById(models),
  deleteUser: deleteUser(models),
});

module.exports = { getUserService };
