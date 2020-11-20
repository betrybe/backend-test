const { validate, decode } = require('../services/jwt');

function createUser(req, res, next) {
  const { displayName, email, password } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!(/(\w+)@(\w+).com/gm).test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  return next();
}

function login(req, res, next) {
  const { email, password } = req.body;

  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (email.length < 1) {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (password.length < 1) {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }

  next();
}

async function token(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  const isValid = await validate(authorization);
  if (!isValid) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }

  req.user = await decode(authorization).id;

  return next();
}

async function createPost(req, res, next) {
  const { id, title, content, published, updated } = req.body;
  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  return next();
}

module.exports = { createUser, login, token, createPost };
