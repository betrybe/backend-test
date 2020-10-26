module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    displayName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  }),

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Users'),
};
