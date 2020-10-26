const errorHandler = async (error, _req, res, _next) => {
  const { response, status } = error;
  return res.status(status).json(response);
};

module.exports = errorHandler;
