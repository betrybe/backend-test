module.exports = () => async (err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ ok: false, message: err.message });
  return res.status(500).json({ ok: false, message: 'Error of building software' });
};
