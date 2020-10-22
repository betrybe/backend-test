class Container {
  constructor(start, { services, models, controllers, utils, middlewares }) {
    this.services = services;
    this.models = models;
    this.controllers = controllers;
    this.utils = utils;
    this.startCb = start;
    this.middlewares = middlewares;
  }

  makeServices() {
    this.services = this.services(this.models, this.utils);
  }

  makeMiddlewares() {
    this.middlewares = this.middlewares(this.services);
  }

  injectOnControllers() {
    const injectedController = Object.entries(this.controllers).reduce((newControllers, [controllerName, objFunctions]) => {
      newControllers[controllerName] = Object.entries(objFunctions).reduce(
        (newController, [functioName, func]) => {
          newController[functioName] = func(this.services, this.utils);
          return newController;
        },
        {},
      );
      return newControllers;
    }, {});
    this.controllers = injectedController;
  }

  start(Routers, config) {
    this.startCb(Routers(this.controllers, this.middlewares), config, this.middlewares);
  }
}

module.exports = Container;
