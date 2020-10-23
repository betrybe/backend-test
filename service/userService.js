const jwt = require('jsonwebtoken');
const { validateUser, findByEmail } = require('../middlewares/valiData');
const { Users } = require('../models');

const genericErr = (code, message) => ({
  code,
  message,
});

// const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createUser = async (data) => {
  const { displayName, email, password, image } = data;
  const hasError = await validateUser(data);
  const userExists = await findByEmail(email);

  if (hasError) return genericErr(400, hasError);
  if (userExists) return genericErr(409, { message: 'Usuário já existe' });

  try {
    const user = await Users.create({ displayName, email, password, image });
    const token = jwt.sign({ user }, '123deOliveira4', jwtConfig);
    return { token };
  } catch (e) {
    return genericErr(500, e);
  }
};

module.exports = createUser;
