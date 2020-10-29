const errorHandler = async (error, _req, res, _next) => {
  const { message, validatorKey, code } = error;
  if (validatorKey === 'not_unique') return res.status(409).json({ message: 'Usuário já existe' });
  if (code) return res.status(code).json({ message });
  return res.status(400).json({ message });
};

module.exports = errorHandler;
