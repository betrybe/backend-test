module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Posts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    published: {
      type: Sequelize.DATE,
    },
    updated: {
      type: Sequelize.DATE,
    },

  }),

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Posts'),
};
