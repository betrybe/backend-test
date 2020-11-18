const jwt = require('jsonwebtoken');

const config = require('./config');

module.exports = async (req, res, next) => {
  try {
    const { data } = req;

    const validationToken = jwt.sign(
      { data },
      config.tokenKey,
      config.tokenConfig,
    );

    res.status(200).json({ token: validationToken });
    return next();
  } catch (error) {
    return next(error);
  }
};
