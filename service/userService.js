const createUser = (models) => (displayName, email, password, image) =>
  models.User.create({ displayName, email, password, image });

const getAllUser = (models) => () => models.User.findAll();

const getUserById = (models) => (id) => models.User.findByPk(id);

const deleteUser = (models) => (me) => models.User.destroy({
  where: { id: me },
});

const getUserService = (models) => ({
  createUser: createUser(models),
  getAllUser: getAllUser(models),
  getUserById: getUserById(models),
  deleteUser: deleteUser(models),
});

module.exports = { getUserService };
