const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');

const { SECRET = 'preguicadecriarumsegredo' } = process.env;

const config = { expiresIn: '1d', algorithm: 'HS256' };

module.exports = rescue(async (req, res) => {
  const { user } = req;

  try {
    const token = jwt.sign({ data: user }, SECRET, config);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status.json({ message: 'algo deu errado' });
  }
});
