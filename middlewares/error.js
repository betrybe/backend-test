const boom = require('@hapi/boom');

module.exports = (err, _req, res, _next) => {
  if (boom.isBoom(err)) {
    const { statusCode, payload } = err.output;
    return res.status(statusCode).json({ message: payload.message });
  }

  return res.status(500).json({ message: err });
};
