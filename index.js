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
  services: {
    object: services,
    params: ['models', 'utils'],
  },
  models: {
    object: { Op, ...models },
  },
  controllers: {
    object: controllers,
    params: ['services', 'utils'],
  },
  middlewares: {
    object: middlewares,
    params: ['services'],
  },
  utils: {
    object: utils,
  },
});

app.callInjection('services');
app.callInjection('middlewares');
app.injectOn('controllers');

app.start(Routers, config);
