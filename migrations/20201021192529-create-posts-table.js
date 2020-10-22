module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Posts', {
    id: { primaryKey: true, autoIncrement: true, allowNull: false, type: Sequelize.INTEGER },
    title: { allowNull: false, type: Sequelize.STRING },
    content: { allowNull: false, type: Sequelize.TEXT },
    updated: { allowNull: false, type: Sequelize.DATE },
    published: { allowNull: false, type: Sequelize.DATE },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      foreignKey: true,
      onUpdate: 'cascade',
      onDelete: 'cascade',
      references: { model: 'Users', key: 'id' },
    },
  }),

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Posts'),
};
