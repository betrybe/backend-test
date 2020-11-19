const jwt = require('jsonwebtoken');

const config = require('./config');

module.exports = async (req, res, next) => {
  try {
    const { displayName, email, image } = req.body;

    const data = { displayName, email, image };

    const validationToken = jwt.sign(
      { data },
      config.tokenKey,
      config.tokenConfig,
    );

    return res.status(req.status).json({ token: validationToken });
  } catch (error) {
    return next(error);
  }
};
