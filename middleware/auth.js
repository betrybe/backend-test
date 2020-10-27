const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.SECRET || 'jwtSecret';

/*
*Middleware criado para checagem e validação de token JWT, foi baseado na
* resposta do stackoverflow no seguinte
* endereço : https://stackoverflow.com/questions/59478330/jwt-must-be-provided-delete-method-returning-token-as-null-instead-of-user-tok
* pois não estava conseguindo criar um middleware que centralizasse toda as verificações necessárias
* do token .
*/
const auth = (req, res, next) => {
  let token;
  const error = { isError: false };
  if (
    req.headers.authorization
  ) {
    token = req.headers.authorization;
  }

  if (!token) {
    error.isError = true;
    error.message = 'Token não encontrado';
    return res.status(401).json(error);
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (ex) {
    error.isError = true;
    error.message = 'Token expirado ou inválido';
    return res.status(401).json(error);
  }
};

module.exports = auth;
