module.exports = (enviroment) => (err, _req, res, _next) => {
  if (enviroment === 'development') {
    console.error(err);
  }
  console.error(err);
  res.status(500).json({ message: err.message });
};
