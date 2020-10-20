const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const Boom = require('boom');

const { SECRET = 'preguicadecriarumsegredo' } = process.env;

const config = { expiresIn: '1d', algorithm: 'HS256' };

module.exports = (status) => rescue(async (req, res, next) => {
  const { user } = req;
  console.log(user);

  if (!user) return next(Boom.badRequest('Campos inválidos'));

  try {
    const token = jwt.sign({ data: user }, SECRET, config);

    return res.status(status).json({ token });
  } catch (err) {
    return res.status.json({ message: 'algo deu errado' });
  }
});
