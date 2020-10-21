const express = require('express');
const bodyParser = require('body-parser');

const factory = async () => {
  const app = express();

  app.use(bodyParser.json());

  return app;
};

module.exports = { factory };
