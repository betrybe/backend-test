const { User } = require('../models');
const { encode, validate, decode } = require('../services/jwt');

async function createUser(req, res) {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await User.create({ displayName, email, password, image });
    const token = encode(newUser);
    console.log(token);
    res.status(201).json({ token });
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
    if (!isValid) {
      return res.status(401).json({ message: 'Token expirado ou inválido' });
    }
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json('no user');
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    const isValid = await validate(authorization);
    if (!isValid) {
      return res.status(401).json({ message: 'Token expirado ou inválido' });
    }
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: 'user not found' });
  }
}

async function deleteMe(req, res) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  const isValid = await validate(authorization);
  if (!isValid) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
  const { email } = await decode(authorization);
  const userDeleted = await User.destroy({ where: { email } });
  res.status(204).json(userDeleted);
}

module.exports = { createUser, loginUser, getUsers, getUserById, deleteMe };
