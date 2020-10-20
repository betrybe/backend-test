const Boom = require('boom');

module.exports = (err, _req, res, _next) => {
  if (Boom.isBoom(err)) {
    const { statusCode, payload } = err.output;
    console.log(payload);
    return res.status(statusCode).json({ message: payload.message });
  }

  return res.status(500).json({ message: err });
};
