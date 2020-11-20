const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const secret = 'tokendentrodasespecificacoesdesegurancamuitomaeniro';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    const {
      user: {
        dataValues: { id },
      },
    } = jwt.verify(token, secret);
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuario do token.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};
