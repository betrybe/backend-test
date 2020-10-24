const rescue = require('express-rescue');
const { userRegister, findAllUsers, findUserById, deleteUserByEmail } = require('../services/userService');
const createToken = require('../token/createToken');

const createUser = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const response = await userRegister(displayName, email, password, image);

  if (response.error) {
    return res.status(response.error.status).json({ message: response.error.message });
  }

  const token = createToken(email);

  return res.status(201).json({ token });
});

const getAllUsers = rescue(async (_req, res) => {
  const response = await findAllUsers();

  return res.status(200).json(response);
});

const getUserById = rescue(async (req, res) => {
  const { id } = req.params;
  const response = await findUserById(id);

  if (response.error) {
    return res.status(response.error.status).json({ message: response.error.message });
  }

  return res.status(200).json(response);
});

const deleteUser = rescue(async (req, res, next) => {
  const { email } = req.user[0];

  try {
    await deleteUserByEmail(email);
    return res.status(204).end();
  } catch (err) {
    console.log('erro', err);
    next(err);
  }
});

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
