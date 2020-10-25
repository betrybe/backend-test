const createUser = (models) => (displayName, email, password, image) =>
  models.User.create({ displayName, email, password, image }).then((result) => result)
    .catch((e) => console.log(e));

const getAllUser = (models) => (email) => models.User.findAll({ where: { email } })
  .then((result) => result)
  .catch((e) => console.error(e));

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
