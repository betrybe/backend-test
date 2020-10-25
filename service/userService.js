const { validateUser } = require('../middlewares/valiData');
const { Users } = require('../models');

const genericErr = (code, message) => ({
  code,
  message,
});

// const findById = (id) => Users.findOne({ where: { id } });
const findByEmail = (email) => Users.findOne({ where: { email } });
const findByEmailPass = (email, password) => Users.findOne({ where: { email, password } });

const createUser = async (data) => {
  const { displayName, email, password, image } = data;
  const hasError = await validateUser(data);
  const userExists = await findByEmail(email || '');

  if (hasError) return genericErr(400, hasError);
  if (userExists) return genericErr(409, { message: 'Usuário já existe' });

  try {
    return await Users.create({ displayName, email, password, image });
  } catch (e) {
    return genericErr(500, e);
  }
};

module.exports = {
  // findById,
  createUser,
  findByEmail,
  findByEmailPass,
};
