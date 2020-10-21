module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,

    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: { tableName: 'Users' },
        key: 'id',
      },
    },
    published: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Users'),
};
