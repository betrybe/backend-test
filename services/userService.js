const createUser = (models, createToken) => async ({
  displayName,
  email,
  image,
  password,
}) => {
  const user = await models.User.create({ displayName, email, image, password });
  const token = createToken({ displayName, email, id: user.dataValues.id });
  return token;
};

const login = (models, createToken) => async (email, password) => {
  const foundUser = await models.User.findOne({
    where: { email, password },
  });
  if (!foundUser) return { error: 'invalid_fields' };
  const { id, displayName } = foundUser.dataValues;
  const token = createToken({ displayName, id, email });

  return token;
};

const getAll = (models) => async () => {
  const users = await models.User.findAll({ attributes: {
    exclude: 'password',
  } });
  return users.map((user) => user.dataValues);
};

const getById = (models) => async (id) => {
  const user = await models.User.findByPk(id);
  if (!user) return;
  return user.dataValues;
};

const deleteMe = (models) => async (id) => models.User.destroy({ where: { id } });

const userService = (models, createToken) => ({
  createUser: createUser(models, createToken),
  login: login(models, createToken),
  getAll: getAll(models),
  getById: getById(models),
  deleteMe: deleteMe(models),
});

module.exports = userService;
