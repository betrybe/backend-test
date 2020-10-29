const errorHandler = async (error, _req, res, _next) => {
  const { message, validatorKey } = error.errors[0];
  if (validatorKey === 'not_unique') return res.status(409).json({ message: 'Usuário já existe' });
  return res.status(400).json({ message });
};

module.exports = errorHandler;
