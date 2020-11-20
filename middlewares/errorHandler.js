const errorHandler = async (err, _req, res, _next) => {
  if (!err.errors) return res.status(500).json({ message: err.message, stack: err.stack });
  const { message, validatorKey } = err.errors[0];
  if (validatorKey === 'not_unique') return res.status(409).json({ message: 'Usuário já existe' });
  if (err.code) return res.status(err.code).json({ message });
  return res.status(400).json({ message });
};

module.exports = errorHandler;
