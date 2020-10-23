const jwt = require('jsonwebtoken');

const SECRET = 'revengeneverisresponse';
const jwtConfig = { algorithm: 'HS256' };
const GenerateToken = (userdata) => {
  const token = jwt.sign(userdata, SECRET, jwtConfig);
  return token;
};

module.exports = { GenerateToken };
