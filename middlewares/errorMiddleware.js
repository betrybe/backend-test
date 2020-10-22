const Boom = require('boom');

module.exports = (err, _req, res, _next) => {
  if (Boom.isBoom(err)) {
    const { statusCode, error, message } = err.output.payload;
    res.status(statusCode).json({
      error,
      message,
      stack: err.stack,
    });
  }
  console.log(err);
  res.status(500).json({
    err: {
      error: err.message,
      message: 'Internal Error',
      stack: err.stack,
    },
  });
};
