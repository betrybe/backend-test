module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Posts', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    updated: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    published: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      onUpdate: 'cascade',
      onDelete: 'cascade',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }),

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Posts'),
};
