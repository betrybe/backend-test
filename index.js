const { Op } = require('sequelize');

const Container = require('./container');

const start = require('./app');

const services = require('./services');
const controllers = require('./controllers');
const models = require('./models');
const utils = require('./utils');
const middlewares = require('./middlewares');
const Routers = require('./routers');

require('dotenv/config');

const config = {
  PORT: process.env.PORT,
};

const app = new Container(start, {
  services,
  models: { Op, ...models },
  controllers,
  middlewares,
  utils,
});

app.makeServices();
app.makeMiddlewares();
app.injectOnControllers();

app.start(Routers, config);
