class Container {
  constructor(start, { services, models, controllers, utils, middlewares }) {
    this.services = services;
    this.models = models;
    this.controllers = controllers;
    this.utils = utils;
    this.middlewares = middlewares;
    this.startCb = start;
  }

  callInjection(type) { // para uma funcao que retorna o objeto modulo
    this[type].object = this[type].object(...this.getParams(type));
  }

  getParams(type) {
    const { params } = this[type];
    return params.map((param) => this[param].object);
  }

  populate(objFunctions, type) {
    return Object.entries(objFunctions).reduce((newObj, [functionName, func]) => ({
      [functionName]: func(...this.getParams(type)),
      ...newObj,
    }), {});
  }

  injectOn(type) { // para um objeto modulo de itens funcao que retornam objeto
    this[type].object = Object.entries(this[type].object)
      .reduce((newObject, [itemName, objFunctions]) => ({
        [itemName]: this.populate(objFunctions, 'controllers'),
        ...newObject,
      }), {});
  }

  start(getRouters, config) {
    const Routers = getRouters(this.controllers.object, this.middlewares.object);
    this.startCb(Routers, config, this.middlewares.object);
  }
}

module.exports = Container;
