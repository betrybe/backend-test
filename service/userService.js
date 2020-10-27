const createUser = (models) => (displayName, email, password, image) =>
  models.User.create({ displayName, email, password, image })
    .then((result) => result)
    .catch((e) => console.log(e));

const getAllUser = (models) => () => models.User.findAll({ raw: true })
  .then((result) => result)
  .catch((e) => console.error(e));

const checkEmail = (models) => (email) => models.User.findAll({ where: { email } });

const getUserById = (models) => (id) => models.User.findByPk(id);

const deleteUser = (models) => async (email) => models.User.destroy({ where: { email } });

const getUserService = (models) => ({
  createUser: createUser(models),
  getAllUser: getAllUser(models),
  getUserById: getUserById(models),
  deleteUser: deleteUser(models),
  checkEmail: checkEmail(models),
});

module.exports = { getUserService };
