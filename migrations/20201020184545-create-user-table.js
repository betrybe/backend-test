'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: { primaryKey: true, autoIncrement: true, allowNull: false, type: Sequelize.INTEGER },
    email: { unique: true, allowNull: false, type: Sequelize.STRING },
    displayName: { allowNull: true, type: Sequelize.STRING },
    password: { allowNull: false, type: Sequelize.STRING },
    image: { allowNull: true, type: Sequelize.STRING },
  }),

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Users'),
};
