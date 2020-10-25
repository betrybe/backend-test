const { Router } = require('express');
const rescue = require('express-rescue');
const createToken = require('../../utils/createToken');
const validateToken = require('../middleware/tokenValidation');
const {
  userValidate,
  userInfoExist,
  userDataEmpty,
} = require('../middleware/authUser');
const {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUser,
  deleteUser,
} = require('../../services');

const user = Router();
const login = Router();

user.post(
  '/',
  userInfoExist,
  userValidate,
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const dataUser = await getUserByEmail(email);

    if (dataUser.length > 0) return res.status(409).json({ message: 'Usuário já existe' });

    await createUser(displayName, email, password, image);

    const token = createToken(dataUser);

    return res.status(201).json({ token });
  }),
);

login.post(
  '/',
  userInfoExist,
  userDataEmpty,
  rescue(async (req, res) => {
    const { email } = req.body;
    const token = createToken(email);

    const userLogin = await getUserByEmail(email);
    if (userLogin.length <= 0) return res.status(400).json({ message: 'Campos inválidos' });

    return res.status(200).json({ token });
  }),
);

user.get(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;

    const userById = await getUserById(id);

    if (userById.length <= 0) return res.status(404).json({ message: 'Usuário não existe' });

    res.status(200).json(userById[0]);
  }),
);

user.get(
  '/',
  validateToken,
  rescue(async (_req, res) => {
    const allUsers = await getAllUser();

    return res.status(200).json(allUsers);
  }),
);

user.delete(
  '/me',
  validateToken,
  rescue(async (req, res) => {
    const { email } = req.user;

    await deleteUser(email);

    res.status(204).end();
  }),
);

module.exports = { user, login };
