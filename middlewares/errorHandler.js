module.exports = (error, _req, res, _next) => {
  const { status, message } = error;
  return res.status(status).json({ message });
};
