const errorHandler = (err, _req, res, _next) =>
  (err.message
    ? res.status(err.status).json({ message: err.message })
    : res.status(500).json({ message: 'Internal error' }));

module.exports = errorHandler;
