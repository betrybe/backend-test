const { Users } = require('../models');
const { getToken } = require('../service/tokenService');
const { checkLoginFields } = require('../middlewares/valiData');
const { createUser, findByEmailPass } = require('../service/userService');

const insertUser = async (req, res) => {
  const response = await createUser(req.body);

  return response.dataValues
    ? res.status(201).json({ token: getToken(response) })
    : res.status(response.code).json(response.message);
};

const logUserIn = async (req, res) => {
  const { email, password } = req.body;
  const emptyFieldsMsg = checkLoginFields(email, password);

  if (emptyFieldsMsg) return res.status(400).json(emptyFieldsMsg);

  try {
    const user = await findByEmailPass(email, password);
    return user
      ? res.status(200).json({ token: getToken(user) })
      : res.status(400).json({ message: 'Campos inválidos' });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const selectAll = async (_req, res) => {
  try {
    const userList = await Users.findAll({ attributes: { exclude: 'password' } });
    res.status(200).json(userList);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const selectById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findOne({
      where: { id },
      attributes: { exclude: 'password' },
    });

    return user
      ? res.status(200).json(user)
      : res.status(404).json({ message: 'Usuário não existe' });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const selfDestruct = async (req, res) => {
  try {
    await req.user.destroy();
    res.status(204).json();
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = {
  insertUser,
  logUserIn,
  selectAll,
  selectById,
  selfDestruct,
};
