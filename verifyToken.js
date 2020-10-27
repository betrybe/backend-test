const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  try {
    const { dataValues: { password, ...rest } } = jwt.verify(token, 'xablau');
    return rest;
  } catch (err) {
    return { err: true, message: 'Token expirado ou inválido' };
  }
};

const verifyError = (authorization, res) => {
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  const verify = verifyToken(authorization);
  if (verify !== undefined && verify.err) {
    const { message } = verify;
    return res.status(401).json({ message });
  }
};

module.exports = {
  verifyToken,
  verifyError,
};
