const express = require('express');

const errorMiddleware = require('./middlewares/error');

const factory = async (config) => {
  const app = express();

  app.get('/ping', (_, res) => res.status(200).json({ message: 'ok' }));

  app.use(errorMiddleware(config.enviroment));

  return app;
};

module.exports = { factory };
