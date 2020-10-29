const errorHandler = async (error, _req, res, _next) => {
  if (!error.errors) return res.status(500).json({ message: error.message, stack: error.stack });
  const { message, validatorKey } = error.errors[0];
  if (validatorKey === 'not_unique') return res.status(409).json({ message: 'Usuário já existe' });
  if (error.code) return res.status(error.code).json({ message });
  return res.status(400).json({ message });
};

module.exports = errorHandler;
