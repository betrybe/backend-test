const jwt = require('jsonwebtoken');
const { findByEmailPass } = require('./userService');

// const { jwtsecret } = process.env;

const jwtsecret = '123deOliveira4';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const getToken = (payload) => jwt.sign({ payload }, jwtsecret, jwtConfig);

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    // Através do método verify, podemos validar e decodificar o nosso JWT.
    const { payload } = jwt.verify(token, jwtsecret);
    const { email, password } = payload;
    const user = await findByEmailPass(email, password);
    // Verifica a existência de usuário no BD

    if (!user) { return res.status(401).json({ message: 'Token expirado ou inválido' }); }

    // Se o usuário existe...
    req.user = user;

    // Próximo middleware (callback da rota)
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = {
  getToken,
  authMiddleware,
};
