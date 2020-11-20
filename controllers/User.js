const { User } = require('../models');
const { encode, validate } = require('../services/jwt');

async function createUser(req, res) {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await User.create({ displayName, email, password, image });
    const token = encode(newUser).value;
    res.status(201).json(token);
  } catch (e) {
    console.log(e);
    res.status(409).json({
      message: 'Usuário já existe',
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user.password === String(password)) {
      return res.status(200).json({ token: (encode(user)) });
    }
    throw new Error();
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'Campos inválidos' });
  }
}

async function getUsers(req, res) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    const isValid = await validate(authorization);
    console.log(isValid, 'valida');
    if (!isValid) {
      return res.status(401).json({ message: 'Token expirado ou inválido' });
    }
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json('no user');
  }
}

module.exports = { createUser, loginUser, getUsers };
