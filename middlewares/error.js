const Boom = require('@hapi/boom');

const errorHandler = (error, _req, res, _next) => {
  if (Boom.isBoom(error)) {
    return res.status(error.output.statusCode).send({ message: error.message });
  }
  console.log(error);
  return res.status(500).json('A wild server bug has appears...');
};

module.exports = errorHandler;
