const create = async (model, info) => model.create(info);

const User = require('./users');

const getByPk = async (model, pk) => model.getByPk(pk);

module.exports = {
  User,
  general: {
    create,
    getByPk,
  },
};
