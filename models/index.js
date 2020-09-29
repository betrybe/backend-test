/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config').development;

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db)
  .filter((modelName) => Boolean(db[modelName].associate))
  .forEach((modelName) => {
    db[modelName].associate(db);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
