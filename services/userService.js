const emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateInfos = (displayName, email, password) => {
  if (displayName.length < 8) return { err: true, message: '"displayName" length must be at least 8 characters long' };
  if (password === '') return { err: true, message: '"password" is not allowed to be empty' };
  if (!password) return { err: true, message: '"password" is required' };
  if (password.length < 6) return { err: true, message: '"password" length must be 6 characters long' };
  if (email === '') return { err: true, message: '"email" is not allowed to be empty' };
  if (!email) return { err: true, message: '"email" is required' };
  if (!emailRegx.test(email)) return { err: true, message: '"email" must be a valid email' };
  return { err: false };
};

const createUser = ({ Users }) => async (displayName, email, password, image) => {
  const errorMessage = validateInfos(displayName, email, password);
  if (errorMessage.err) return errorMessage;

  return Users.create({ displayName, email, password, image });
};

const getUser = ({ Users }) => async (email, password) => {
  const errorMessage = validateInfos('displayName', email, password);
  if (errorMessage.err) return errorMessage;
  const user = await Users.findAll({ where: { email } });
  if (user.length === 0) return { err: true, message: 'Campos inválidos' };
  if (user[0].password === password) {
    const { dataValues: { password: pass, ...rest } } = user[0];
    return rest;
  }
  return { err: true, message: 'wrong password' };
};

const getAllUser = ({ Users }) => async () => {
  const users = await Users.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getUserById = ({ Users }) => async (id) => Users.findByPk(id,
  { attributes: { exclude: ['password'] } })
  .then((user) => {
    if (user === null) {
      return { err: true, message: 'Usuário não existe' };
    }
    return user;
  });

const deleteMe = ({ Users }) => async (id) =>
  Users.destroy({
    where: {
      id,
    },
  }).then((user) => {
    if (user === 0) {
      return { err: true, message: 'Usuário não existe' };
    }
    return user;
  });

const getUserService = (models) => ({
  createUser: createUser(models),
  getUser: getUser(models),
  getAllUser: getAllUser(models),
  getUserById: getUserById(models),
  deleteMe: deleteMe(models),
});

module.exports = { getUserService };
