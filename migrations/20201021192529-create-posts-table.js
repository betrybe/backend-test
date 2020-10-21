module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Posts', {
    id: { primaryKey: true, autoIncrement: true, allowNull: false, type: Sequelize.INTEGER },
    title: { allowNull: false, type: Sequelize.STRING },
    content: { allowNull: false, type: Sequelize.STRING },
    updated: { allowNull: false, type: Sequelize.DATE },
    published: { allowNull: false, defaultValue: Sequelize.NOW, type: Sequelize.TEXT },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      foreignKey: true,
      references: { model: 'Users', key: 'id', onUpdate: 'CASCADE', onDelete: 'CASCADE' },
    },
  }),

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Posts'),
};
