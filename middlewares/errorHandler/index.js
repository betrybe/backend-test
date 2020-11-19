const errorHandler = (err, _req, res, _next) =>
  (err.payload
    ? res.status(err.status).json(err.payload)
    : res.status(500).json({ message: 'Internal error' }));

module.exports = errorHandler;
